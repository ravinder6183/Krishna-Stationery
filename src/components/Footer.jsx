// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-8 text-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3 ml-20">
          <h3 className="text-xl font-bold">Krishna Stationery</h3>
          <p>Manjhawali road</p>
          <p>Gharora, Faridabad (HR)</p>
          <p>ZIP Code: 121101</p>
        </div>
        <div className="space-y-3 text-right ml-60 md:text-left">
          <h3 className="text-xl font-bold">Contact Us</h3>
          <p>Email: contactkrishnastationery@gmail.com</p>
          <p>Phone: +91 9312586688</p>
          <p>Hours: Mon - Fri: 8:00 AM - 7:00 PM</p>
        </div>
      </div>
      <div className="container mx-auto text-center mt-4">
        &copy; {new Date().getFullYear()} Krishna Stationery. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
