import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cartItems, updateCartItem, removeFromCart } = useContext(CartContext);

  const totalPrice = cartItems.reduce((acc, item) => {
    if (item.product && item.product.price) {
      return acc + item.product.price * item.quantity;
    }
    return acc;
  }, 0);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p>Your cart is empty</p>
          <Link to="/products" className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold text-lg mt-4 inline-block">
            Go to Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cartItems.map(item => (
              <CartItem key={item._id} item={item} updateCartItem={updateCartItem} removeFromCart={removeFromCart} />
            ))}
          </div>
          <div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between font-bold">
                <p>Total</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <Link to="/checkout" className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold text-lg mt-4 block text-center">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
