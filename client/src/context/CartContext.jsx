import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const storageKey = 'greennest-cart';

const readCart = () => {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(readCart);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const addItem = product => {
    setItems(current => {
      const existing = current.find(item => item._id === product._id);

      if (existing) {
        return current.map(item =>
          item._id === product._id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    setItems(current =>
      current
        .map(item => (item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
        .filter(item => item.quantity > 0)
    );
  };

  const removeItem = id => {
    setItems(current => current.filter(item => item._id !== id));
  };

  const clearCart = () => setItems([]);

  const summary = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal === 0 || subtotal >= 75 ? 0 : 8.99;
    const total = subtotal + shipping;

    return { count, subtotal, shipping, total };
  }, [items]);

  const value = { items, addItem, updateQuantity, removeItem, clearCart, summary };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
