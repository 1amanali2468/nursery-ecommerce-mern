import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { UserPlus, Sprout } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  const handleSubmit = async event => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    setSubmitting(true);
    setError('');

    try {
      await register(name, email, password);
      navigate(redirect);
    } catch (err) {
      setError(err.message || 'Registration failed. Please check details.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section auth-page">
      <div className="auth-card">
        <span className="brand-mark"><Sprout size={24} /></span>
        <h2>Create an Account</h2>
        <p className="auth-subtitle">Join GreenNest to buy fresh plants, seeds, pots, and care accessories.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

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

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button className="primary-btn wide" type="submit" disabled={submitting}>
            {submitting ? 'Creating account...' : 'Sign Up'} <UserPlus size={18} />
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to={`/login?redirect=${encodeURIComponent(redirect)}`}>Log in here</Link>
        </p>
      </div>
    </section>
  );
}
