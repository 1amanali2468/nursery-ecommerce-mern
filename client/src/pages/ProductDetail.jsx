import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Droplets, ShieldCheck, Sun } from 'lucide-react';
import { fetchProduct } from '../api.js';
import { useCart } from '../context/CartContext.jsx';

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProduct(id)
      .then(setProduct)
      .catch(error => setError(error.message));
  }, [id]);

  if (error) return <p className="state-message error">{error}</p>;
  if (!product) return <p className="state-message">Loading plant details...</p>;

  return (
    <section className="section detail-page">
      <Link className="back-link" to="/"><ArrowLeft size={18} /> Back to shop</Link>

      <div className="detail-layout">
        <img className="detail-image" src={product.image} alt={product.name} />

        <div className="detail-copy">
          <span className="category">{product.category}</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <strong className="detail-price">${product.price.toFixed(2)}</strong>

          <div className="detail-facts">
            <span><Sun /> {product.sunlight}</span>
            <span><Droplets /> {product.water}</span>
            <span><ShieldCheck /> {product.stock} available</span>
          </div>

          <button className="primary-btn wide" type="button" onClick={() => addItem(product)}>
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
}
