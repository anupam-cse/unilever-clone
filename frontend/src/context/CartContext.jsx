import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total_price: 0, total_items: 0 });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  // Cart fetch করা
  const fetchCart = async () => {
    if (!token) {
      setCart({ items: [], total_price: 0, total_items: 0 });
      return;
    }

    try {
      const res = await axios.get('http://127.0.0.1:8000/api/cart/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(res.data);
    } catch (error) {
      console.log('Failed to fetch cart', error);
    }
  };

  // Token পরিবর্তন হলে cart আনবে
  useEffect(() => {
    fetchCart();
  }, [token]);

  // Add to cart
  const addToCart = async (product, quantity = 1) => {
    if (!token) {
      alert('Please login to add items to cart');
      return { success: false, needLogin: true };
    }

    try {
      setLoading(true);
      const res = await axios.post(
        'http://127.0.0.1:8000/api/cart/add/',
        { product_id: product.id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data);
      return { success: true };
    } catch (error) {
      console.log('Failed to add to cart', error);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Update quantity
  const updateQuantity = async (itemId, quantity) => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/cart/update/${itemId}/`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data);
    } catch (error) {
      console.log('Failed to update', error);
    }
  };

  // Remove item
  const removeFromCart = async (itemId) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/cart/remove/${itemId}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data);
    } catch (error) {
      console.log('Failed to remove', error);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      await axios.delete('http://127.0.0.1:8000/api/cart/clear/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart({ items: [], total_price: 0, total_items: 0 });
    } catch (error) {
      console.log('Failed to clear', error);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);