import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    category: {
      type: String,
      required: true,
      enum: ['Indoor Plants', 'Outdoor Plants', 'Seeds', 'Planters', 'Care Kits', 'Accessories']
    },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    stock: { type: Number, required: true, min: 0 },
    sunlight: { type: String, required: true },
    water: { type: String, required: true },
    badge: { type: String, default: '' },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema);
