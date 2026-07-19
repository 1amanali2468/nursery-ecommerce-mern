import { Link, NavLink } from 'react-router-dom';
import { Leaf, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function Header() {
  const { summary } = useCart();

  return (
    <header className="site-header">
      <Link className="brand" to="/">
        <span className="brand-mark"><Leaf size={22} /></span>
        <span>GreenNest</span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/">Shop</NavLink>
        <a href="#care">Care Guide</a>
        <a href="#visit">Visit</a>
      </nav>

      <Link className="cart-link" to="/cart" aria-label="Open cart">
        <ShoppingBag size={20} />
        <span>{summary.count}</span>
      </Link>
    </header>
  );
}
