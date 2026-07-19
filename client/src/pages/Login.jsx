import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { LogIn, Sprout } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  const handleSubmit = async event => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await login(email, password);
      navigate(redirect);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section auth-page">
      <div className="auth-card">
        <span className="brand-mark"><Sprout size={24} /></span>
        <h2>Welcome back to GreenNest</h2>
        <p className="auth-subtitle">Login to your account to continue shopping and manage orders.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button className="primary-btn wide" type="submit" disabled={submitting}>
            {submitting ? 'Logging in...' : 'Login'} <LogIn size={18} />
          </button>
        </form>

        <p className="auth-footer">
          New to GreenNest? <Link to={`/register?redirect=${encodeURIComponent(redirect)}`}>Create an account</Link>
        </p>
      </div>
    </section>
  );
}
