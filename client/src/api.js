const API_URL = import.meta.env.VITE_API_URL || '/api';

export const fetchProducts = async params => {
  const query = new URLSearchParams(params);
  const response = await fetch(`${API_URL}/products?${query.toString()}`);

  if (!response.ok) {
    throw new Error('Unable to load products right now.');
  }

  return response.json();
};

export const fetchProduct = async id => {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error('This product could not be found.');
  }

  return response.json();
};

export const submitOrder = async order => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Unable to place your order.');
  }

  return data;
};
