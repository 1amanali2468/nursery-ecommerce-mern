import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Leaf, ShoppingBag, Menu, X, LogOut, User } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Header() {
  const { summary } = useCart();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <header className="site-header">
      <Link className="brand" to="/" onClick={closeMenu}>
        <span className="brand-mark"><Leaf size={22} /></span>
        <span>GreenNest</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="nav-links desktop-only">
        <NavLink to="/" end>Shop</NavLink>
        <a href="#care">Care Guide</a>
        <a href="#visit">Visit</a>
      </nav>

      {/* Right side actions */}
      <div className="header-actions">
        {user ? (
          <div className="user-profile-menu">
            <span className="user-greeting">
              <User size={16} />
              <span className="user-name">{user.name.split(' ')[0]}</span>
            </span>
            <button className="logout-btn" onClick={handleLogout} title="Logout">
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <Link className="login-link" to="/login">Login</Link>
        )}

        <Link className="cart-link" to="/cart" aria-label="Open cart" onClick={closeMenu}>
          <ShoppingBag size={20} />
          <span>{summary.count}</span>
        </Link>

        {/* Mobile Hamburger Button */}
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar/Drawer Menu */}
      <div className={`mobile-nav-drawer ${menuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-links">
          <NavLink to="/" end onClick={closeMenu}>Shop</NavLink>
          <a href="#care" onClick={closeMenu}>Care Guide</a>
          <a href="#visit" onClick={closeMenu}>Visit</a>
          <div className="mobile-auth-section">
            {user ? (
              <>
                <div className="mobile-user-info">
                  <User size={18} />
                  <span>{user.name}</span>
                </div>
                <button className="primary-btn wide logout-btn-mobile" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <Link className="primary-btn wide login-btn-mobile" to="/login" onClick={closeMenu}>
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
      
      {/* Drawer overlay */}
      {menuOpen && <div className="drawer-overlay" onClick={closeMenu}></div>}
    </header>
  );
}
