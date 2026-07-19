import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';

const roundMoney = value => Number(value.toFixed(2));

export const createOrder = async (req, res, next) => {
  const { customer, shippingAddress, items } = req.body;

  if (!customer || !shippingAddress || !Array.isArray(items) || items.length === 0) {
    const error = new Error('Customer, shipping address, and cart items are required.');
    error.statusCode = 400;
    return next(error);
  }

  const productIds = items.map(item => item.product);
  const products = await Product.find({ _id: { $in: productIds } });

  if (products.length !== productIds.length) {
    const error = new Error('One or more products are unavailable.');
    error.statusCode = 400;
    return next(error);
  }

  const orderItems = items.map(item => {
    const product = products.find(entry => entry.id === item.product);

    if (!product || product.stock < item.quantity) {
      const error = new Error(`${product?.name || 'A product'} does not have enough stock.`);
      error.statusCode = 400;
      throw error;
    }

    return {
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: Number(item.quantity)
    };
  });

  const itemsPrice = roundMoney(
    orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  const shippingPrice = itemsPrice >= 75 ? 0 : 8.99;
  const totalPrice = roundMoney(itemsPrice + shippingPrice);

  const order = await Order.create({
    customer,
    shippingAddress,
    items: orderItems,
    itemsPrice,
    shippingPrice,
    totalPrice
  });

  await Promise.all(
    orderItems.map(item =>
      Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } })
    )
  );

  res.status(201).json(order);
};

export const getOrderById = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('items.product');

  if (!order) {
    const error = new Error('Order not found');
    error.statusCode = 404;
    return next(error);
  }

  res.json(order);
};
