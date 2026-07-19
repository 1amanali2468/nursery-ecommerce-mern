import dotenv from 'dotenv';
import { connectDatabase } from '../config/db.js';
import { Product } from '../models/Product.js';
import { Order } from '../models/Order.js';
import { products } from './products.js';

dotenv.config();

const seedDatabase = async () => {
  await connectDatabase();

  await Order.deleteMany();
  await Product.deleteMany();
  await Product.insertMany(products);

  console.log(`Seeded ${products.length} nursery products.`);
  process.exit(0);
};

seedDatabase().catch(error => {
  console.error(error);
  process.exit(1);
});
