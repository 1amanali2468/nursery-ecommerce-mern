import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDatabase } from './config/db.js';
import { ensureProducts } from './data/ensureProducts.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, '../../client/dist');

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'GreenNest Nursery API' });
});

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

app.use(express.static(clientDistPath));

app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

app.use(notFound);
app.use(errorHandler);

connectDatabase().then(async () => {
  await ensureProducts();

  app.listen(port, () => {
    console.log(`GreenNest API running on http://localhost:${port}`);
  });
});
