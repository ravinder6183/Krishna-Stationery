/* eslint-disable no-unused-vars */
// src/context/CartContext.js
import React, { createContext, useReducer, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

const initialState = {
  cartItems: [],
};

const cartReducer = (state, action) => {
  // console.log(state)
  // console.log(action.payload)
  switch (action.type) {
    case 'SET_CART':
      return { ...state, cartItems: action.payload };
    case 'ADD_TO_CART':
      if (!action.payload.product || !action.payload.product._id) {
        console.error('ADD_TO_CART payload is missing product details:', action.payload);
        return state;
      }
      const existingItem = state.cartItems.find(item => item.product._id === action.payload.product._id);
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.product._id === action.payload.product._id ? { ...item, quantity: item.quantity + action.payload.quantity } : item
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, action.payload] };
      }
    case 'UPDATE_CART_ITEM':
      if (!action.payload._id) {
        console.error('UPDATE_CART_ITEM payload is missing item ID:', action.payload);
        return state;
      }
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.product._id === action.payload._id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    case 'REMOVE_FROM_CART':
      // console.log(action)
      if (!action.payload) {
        console.error('REMOVE_FROM_CART payload is missing item ID:', action.payload);
        return state;
      }
      // console.log(state)
      return { ...state, cartItems: state.cartItems.filter(item => item.product._id !== action.payload) };
    default:
      return state;
  }
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cart`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          // console.log(data)
          dispatch({ type: 'SET_CART', payload: data.items });
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      }
    };
    fetchCart();
  }, [user]);

  const addToCart = async (product, quantity) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/cart`,
        { productId: product._id, quantity },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/cart/${itemId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      dispatch({ type: 'UPDATE_CART_ITEM', payload: { _id: itemId, quantity } });
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      // console.log(itemId)
      dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems: state.cartItems, addToCart, updateCartItem, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
