import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Search, Sprout } from 'lucide-react';
import { fetchProducts } from '../api.js';
import ProductCard from '../components/ProductCard.jsx';

const categories = ['All', 'Indoor Plants', 'Outdoor Plants', 'Seeds', 'Planters', 'Care Kits', 'Accessories'];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    setLoading(true);
    fetchProducts({ category, search })
      .then(data => {
        if (!ignore) {
          setProducts(data);
          setError('');
        }
      })
      .catch(error => {
        if (!ignore) setError(error.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [category, search]);

  const featured = useMemo(() => products.filter(product => product.featured).slice(0, 3), [products]);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><Sprout size={17} /> Fresh from our nursery</span>
          <h1>Plants that make homes feel alive.</h1>
          <p>
            Shop hand-picked indoor plants, balcony blooms, organic care kits, and planters
            grown for healthy roots and easy everyday care.
          </p>
          <a className="hero-action" href="#catalog">
            Browse plants <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <section className="section intro-band" id="care">
        <div>
          <span className="section-kicker">Why GreenNest</span>
          <h2>Nursery stock, not warehouse leftovers.</h2>
        </div>
        <p>
          Every order is checked by a plant specialist, watered before dispatch, and packed
          with a quick care note so the plant arrives ready for its new spot.
        </p>
      </section>

      <section className="section catalog" id="catalog">
        <div className="catalog-heading">
          <div>
            <span className="section-kicker">Shop the nursery</span>
            <h2>Find the right green companion</h2>
          </div>

          <label className="search-box">
            <Search size={18} />
            <input
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="Search plants, kits, planters"
            />
          </label>
        </div>

        <div className="category-tabs" aria-label="Product categories">
          {categories.map(item => (
            <button
              className={item === category ? 'active' : ''}
              key={item}
              type="button"
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {featured.length > 0 && category === 'All' && !search && (
          <div className="featured-strip">
            {featured.map(product => (
              <span key={product._id}>{product.name}</span>
            ))}
          </div>
        )}

        {loading && <p className="state-message">Loading fresh stock...</p>}
        {error && <p className="state-message error">{error}</p>}

        {!loading && !error && (
          <div className="product-grid">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
