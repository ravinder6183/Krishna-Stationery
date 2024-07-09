import React from 'react';

const Modal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-medium text-gray-900">Order Placed</h3>
        <p className="mt-2 text-sm text-gray-600">
          Your order has been placed successfully! We have sent you an email with all of the details of your order.
        </p>
        <div className="mt-4">
          <button
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            onClick={closeModal}
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
