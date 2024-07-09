import React from 'react';

const CartItem = ({ item, updateCartItem, removeFromCart }) => {

  const handleRemove = (item) => {
    // console.log(item)
    removeFromCart(item.product._id);
  };

  const handleQuantityChange = (item,quantity) => {
    if (quantity > 0) {
      // console.log(item.product._id)
      updateCartItem(item.product._id, quantity);
    } else {
      removeFromCart(item.product._id); 
    }
  };

  if (!item.product) {
    console.error('CartItem is missing product details:', item);
    return null;
  }

  return (
    <div className="cart-item flex items-center mb-4">
      <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg" />
      <div className="ml-4 flex-1">
        <h3 className="text-xl font-bold">{item.product.name}</h3>
        <p className="text-gray-700">${item.product.price} x {item.quantity}</p>
        <div className="flex items-center mt-2">
          <button onClick={() => handleQuantityChange(item,item.quantity - 1)} className="bg-red-500 text-white px-2 py-1 rounded">-</button>
          <span className="mx-2">{item.quantity}</span>
          <button onClick={() => handleQuantityChange(item,item.quantity + 1)} className="bg-green-500 text-white px-2 py-1 rounded">+</button>
        </div>
        <button onClick={()=>handleRemove(item)} className="text-red-500 mt-2">Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
