// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="container mx-auto">
      <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex flex-col justify-center items-center text-center">
          <h1 className="text-white text-5xl font-bold mb-4">Welcome to Krishna Stationery</h1>
          <p className="text-white text-xl mb-6">Your one-stop shop for all your stationery needs</p>
          <Link to="/products" className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg">Shop Now</Link>
        </div>
      </section>
      <section className="py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
        </div>
        <div className="grid grid-cols-1 my-10 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.slice(0, 8).map(product => (
            <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-gray-700">{product.description}</p>
                <Link to={`/product/${product._id}`} className="text-blue-500">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
