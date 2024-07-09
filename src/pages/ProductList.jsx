// src/pages/ProductList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);
  // console.log(products[0]_id)

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Products</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
            <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
          <Link to={`/product/${product._id}`}>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-gray-700">{product.description}</p>
                <button className="bg-violet-500 m-3 text-white px-4 py-2 rounded">View Details</button>
                {/* <Link to={`/product/${product._id}`} className="text-blue-500">View Details</Link> */}
              </div>
          </Link>
            </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
