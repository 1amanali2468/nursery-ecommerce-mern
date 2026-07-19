import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function Cart() {
  const { items, removeItem, summary, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <section className="section empty-cart">
        <h1>Your cart is waiting for plants.</h1>
        <p>Pick a few nursery favorites and they will show up here.</p>
        <Link className="primary-btn link-btn" to="/">Start shopping</Link>
      </section>
    );
  }

  return (
    <section className="section cart-page">
      <div>
        <span className="section-kicker">Your cart</span>
        <h1>Review your plants</h1>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map(item => (
            <article className="cart-item" key={item._id}>
              <img src={item.image} alt={item.name} />
              <div>
                <span className="category">{item.category}</span>
                <h3>{item.name}</h3>
                <strong>${item.price.toFixed(2)}</strong>
              </div>
              <div className="qty-controls">
                <button type="button" onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                  <Minus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                  <Plus size={16} />
                </button>
              </div>
              <button className="icon-danger" type="button" onClick={() => removeItem(item._id)}>
                <Trash2 size={17} />
              </button>
            </article>
          ))}
        </div>

        <aside className="summary-panel">
          <h2>Order summary</h2>
          <p><span>Subtotal</span><strong>${summary.subtotal.toFixed(2)}</strong></p>
          <p><span>Shipping</span><strong>{summary.shipping === 0 ? 'Free' : `$${summary.shipping.toFixed(2)}`}</strong></p>
          <p className="summary-total"><span>Total</span><strong>${summary.total.toFixed(2)}</strong></p>
          <Link className="primary-btn link-btn wide" to="/checkout">Checkout</Link>
        </aside>
      </div>
    </section>
  );
}
