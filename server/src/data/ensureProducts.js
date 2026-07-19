import { Product } from '../models/Product.js';
import { products } from './products.js';

export const ensureProducts = async () => {
  const productCount = await Product.countDocuments();

  if (productCount > 0) {
    return;
  }

  await Product.insertMany(products);
  console.log(`Seeded ${products.length} starter products.`);
};
