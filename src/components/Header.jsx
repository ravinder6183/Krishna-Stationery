// src/components/Header.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext)
  return (
    <header className="bg-gray-800 p-7">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/images/logo.png" alt="Krishna Stationery Logo" className="rounded-full h-12 w-12 mr-2" />
          <span className="text-white text-4xl font-bold">Krishna Stationery</span>
        </Link>
        <nav className="space-x-4">
          <Link to="/products" className="text-white">
            <i className="fas fa-shopping-products"></i> Products
          </Link>
          <Link to="/cart" className="text-white">
            <i className="fas fa-shopping-cart"></i> Cart
          </Link>
          <Link to="/myorders" className="text-white">
            <i className="fas fa-shopping-cart"></i>Orders
          </Link>
          {user ? (
            <>
              <span className="text-white">Welcome, {user.name}</span>
              <button onClick={logout} className="text-white">
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-white">
              <i className="fas fa-user"></i> Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
