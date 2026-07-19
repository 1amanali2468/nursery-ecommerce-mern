import { Link } from 'react-router-dom';
import { Droplets, Star, Sun } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <article className="product-card">
      <Link to={`/products/${product._id}`} className="product-image-wrap">
        <img src={product.image} alt={product.name} />
        {product.badge && <span className="badge">{product.badge}</span>}
      </Link>

      <div className="product-card-body">
        <div className="product-title-row">
          <div>
            <span className="category">{product.category}</span>
            <h3>{product.name}</h3>
          </div>
          <strong>₹{product.price.toLocaleString('en-IN')}</strong>
        </div>

        <p>{product.description}</p>

        <div className="plant-facts">
          <span><Sun size={15} /> {product.sunlight}</span>
          <span><Droplets size={15} /> {product.water}</span>
          <span><Star size={15} /> {product.rating}</span>
        </div>

        <button className="primary-btn" type="button" onClick={() => addItem(product)}>
          Add to cart
        </button>
      </div>
    </article>
  );
}
