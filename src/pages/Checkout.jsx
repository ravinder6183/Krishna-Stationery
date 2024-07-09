import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import Modal from '../components/Modal';

const Checkout = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    mobileNumber: '',
  });
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleCustomerChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleAddressChange = (e) => {
    console.log(cartItems)
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };
  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/'); // Redirect to the homepage
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    // console.log(cartItems)
    const orderItems = cartItems.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
      image: item.product.image,
      price: item.product.price,
      product: item.product._id,
    }));
console.log(orderItems[0].product)
console.log(orderItems)
    const orderData = {
      customerInfo,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice: Number(itemsPrice),
      shippingPrice: Number(shippingPrice),
      taxPrice: Number(taxPrice),
      totalPrice: Number(totalPrice),
    };

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/orders`, orderData, config);
      console.log('Order placed:', data);
      cartItems.forEach((item) => removeFromCart(item.product._id));
      // navigate('/')
      setIsModalOpen(true);
      setTimeout(() => {
        closeModal();
      }, 3000);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0)
  const shippingPrice = itemsPrice > 50 ? 0 : 5.00;
  const taxPrice = (0.15 * itemsPrice);
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice));

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={customerInfo.name}
                  onChange={handleCustomerChange}
                  className="mt-1 p-2 border rounded w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="mobileNumber" className="block text-gray-700">Mobile Number</label>
                <input
                  type="text"
                  name="mobileNumber"
                  id="mobileNumber"
                  value={customerInfo.mobileNumber}
                  onChange={handleCustomerChange}
                  className="mt-1 p-2 border rounded w-full"
                  required
                />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="address" className="block text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={shippingAddress.address}
                  onChange={handleAddressChange}
                  className="mt-1 p-2 border rounded w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={shippingAddress.city}
                  onChange={handleAddressChange}
                  className="mt-1 p-2 border rounded w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-gray-700">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  value={shippingAddress.postalCode}
                  onChange={handleAddressChange}
                  className="mt-1 p-2 border rounded w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-gray-700">Country</label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  value={shippingAddress.country}
                  onChange={handleAddressChange}
                  className="mt-1 p-2 border rounded w-full"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paypal"
                  value="PayPal"
                  checked={paymentMethod === 'PayPal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="paypal" className="text-gray-700">PayPal</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="stripe"
                  value="Stripe"
                  checked={paymentMethod === 'Stripe'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="stripe" className="text-gray-700">Stripe</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="CashOnDelivery"
                  value="Cash On Delivery"
                  checked={paymentMethod === 'Cash On Delivery'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="CashOnDelivery" className="text-gray-700">Cash On Delivery</label>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex items-center">
                {/* <p>{item.product.id}</p> */}
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded mr-4" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{item.product.name}</h3>
                    <p className="text-gray-700">Qty: {item.quantity}</p>
                    <p className="text-gray-700">${item.product.price}</p>
                  </div>
                  <div className="text-lg font-bold">${(item.quantity * item.product.price)}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between font-bold">
                <p>Items:</p>
                <p>${itemsPrice}</p>
              </div>
              <div className="flex justify-between font-bold">
                <p>Shipping:</p>
                <p>${shippingPrice}</p>
              </div>
              <div className="flex justify-between font-bold">
                <p>Tax:</p>
                <p>${taxPrice}</p>
              </div>
              <div className="flex justify-between text-xl font-bold">
                <p>Total:</p>
                <p>${totalPrice}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold text-lg">
              Place Order
            </button>
          </div>
        </form>
        <Modal isOpen={isModalOpen} closeModal={closeModal}/>
    </div>
  );
};

export default Checkout;
