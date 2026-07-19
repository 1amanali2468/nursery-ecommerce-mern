import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { submitOrder } from '../api.js';
import { useCart } from '../context/CartContext.jsx';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  postalCode: ''
};

export default function Checkout() {
  const navigate = useNavigate();
  const { clearCart, items, summary } = useCart();
  const [form, setForm] = useState(emptyForm);
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const updateField = event => {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const order = await submitOrder({
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone
        },
        shippingAddress: {
          address: form.address,
          city: form.city,
          state: form.state,
          postalCode: form.postalCode
        },
        items: items.map(item => ({ product: item._id, quantity: item.quantity }))
      });

      clearCart();
      setOrderId(order._id);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0 && !orderId) {
    return (
      <section className="section empty-cart">
        <h1>Your cart is empty.</h1>
        <button className="primary-btn" type="button" onClick={() => navigate('/')}>Shop plants</button>
      </section>
    );
  }

  if (orderId) {
    return (
      <section className="section order-success">
        <CheckCircle2 size={52} />
        <h1>Order placed.</h1>
        <p>Your GreenNest order number is <strong>{orderId}</strong>.</p>
        <Link className="primary-btn link-btn" to="/">Continue shopping</Link>
      </section>
    );
  }

  return (
    <section className="section checkout-page">
      <div>
        <span className="section-kicker">Checkout</span>
        <h1>Where should we send your plants?</h1>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={updateField} placeholder="Full name" required />
        <input name="email" type="email" value={form.email} onChange={updateField} placeholder="Email" required />
        <input name="phone" value={form.phone} onChange={updateField} placeholder="Phone" required />
        <input className="span-two" name="address" value={form.address} onChange={updateField} placeholder="Street address" required />
        <input name="city" value={form.city} onChange={updateField} placeholder="City" required />
        <input name="state" value={form.state} onChange={updateField} placeholder="State" required />
        <input name="postalCode" value={form.postalCode} onChange={updateField} placeholder="Postal code" required />

        {error && <p className="form-error span-two">{error}</p>}

        <div className="checkout-total span-two">
          <span>Total</span>
          <strong>${summary.total.toFixed(2)}</strong>
        </div>

        <button className="primary-btn span-two" type="submit" disabled={submitting}>
          {submitting ? 'Placing order...' : 'Place order'}
        </button>
      </form>
    </section>
  );
}
