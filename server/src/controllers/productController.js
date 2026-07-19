import { Product } from '../models/Product.js';

export const getProducts = async (req, res) => {
  const { category, search, featured } = req.query;
  const filter = {};

  if (category && category !== 'All') {
    filter.category = category;
  }

  if (featured === 'true') {
    filter.featured = true;
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const products = await Product.find(filter).sort({ featured: -1, createdAt: -1 });
  res.json(products);
};

export const getProductById = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    return next(error);
  }

  res.json(product);
};
