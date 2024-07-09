// src/pages/ProductDetail.js
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CartContext from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && product._id) {
      addToCart(product, 1);
    } else {
      console.error('Product object is incomplete:', product);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg" />
        </div>
        <div className="md:w-1/2 md:ml-8">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-700 mb-4">${product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <button onClick={handleAddToCart} className="bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
          <Link to="/cart" className="bg-gray-500 text-white px-4 py-2 rounded ml-4">View Cart</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
