import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders/myorders`, config);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center">
          <p>You have no orders</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Order {order._id}</h2>
              <div>
                <p><strong>Name:</strong> {order.customerInfo.name}</p>
                <p><strong>Mobile:</strong> {order.customerInfo.mobileNumber}</p>
                <p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
              </div>
              <h3 className="text-xl font-bold mt-4">Items</h3>
              <ul>
                {order.orderItems.map((item) => (
                  <li key={item.product} className="flex justify-between">
                    <div>
                      <p><strong>{item.name}</strong></p>
                      <p>Qty: {item.quantity}</p>
                    </div>
                    <p>${item.price.toFixed(2)}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
