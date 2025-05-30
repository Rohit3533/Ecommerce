import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import product from '../data/product';
import { useOrder } from '../context/OrderContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { setOrderDetails } = useOrder();
  const [variant, setVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = () => {
    const selectedProduct = {
      name: product.name,
      image: product.image,
      price: product.price,
      variant,
      quantity,
    };

    setOrderDetails(selectedProduct); // Store in context
    navigate('/checkout'); // Go to checkout page
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <img src={product.image} alt={product.name} className="w-full h-auto mb-4 rounded-xl" />
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="mb-4">{product.description}</p>
      <p className="text-xl font-semibold mb-4">₹{product.price}</p>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Select Variant:</label>
        <select
          className="w-full p-2 border rounded"
          value={variant}
          onChange={(e) => setVariant(e.target.value)}
        >
          {product.variants.map((v, idx) => (
            <option key={idx} value={v}>{v}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Quantity:</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      <button
        onClick={handleBuyNow}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Buy Now
      </button>
    </div>
  );
};

export default LandingPage;
