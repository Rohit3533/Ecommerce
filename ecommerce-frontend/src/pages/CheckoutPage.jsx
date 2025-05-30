import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('approved');

  useEffect(() => {
    const storedProduct = localStorage.getItem('selectedProduct');
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    if (!product) return;

    const orderData = {
      ...data,
      product: {
        name: product.name,
        variant: product.variant,
        quantity: product.quantity,
        price: product.price
      },
      status,
      orderNumber: `ORD-${Date.now()}${Math.floor(Math.random() * 1000)}`
    };

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (res.ok) {
        navigate('/thank-you');
      } else {
        const error = await res.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      alert('Server error. Please try again.');
    }
  };

  if (!product) return null;

  const total = product.price * product.quantity;

  return (
    <div className="max-w-4xl mx-auto p-4 grid md:grid-cols-2 gap-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-xl font-bold">Billing & Payment Info</h2>

        <input {...register('fullName', { required: true })} placeholder="Full Name" className="input" />
        {errors.fullName && <p className="text-red-500 text-sm">Full name is required</p>}

        <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" className="input" />
        {errors.email && <p className="text-red-500 text-sm">Valid email is required</p>}

        <input {...register('phone', { required: true, pattern: /^[0-9]{10}$/ })} placeholder="Phone Number" className="input" />
        {errors.phone && <p className="text-red-500 text-sm">Valid 10-digit phone is required</p>}

        <input {...register('address', { required: true })} placeholder="Address" className="input" />
        <input {...register('city', { required: true })} placeholder="City" className="input" />
        <input {...register('state', { required: true })} placeholder="State" className="input" />
        <input {...register('zipCode', { required: true })} placeholder="Zip Code" className="input" />

        <input {...register('cardNumber', { required: true, pattern: /^[0-9]{16}$/ })} placeholder="Card Number" className="input" />
        {errors.cardNumber && <p className="text-red-500 text-sm">Enter 16-digit card number</p>}

        <input {...register('expiryDate', { required: true })} type="month" placeholder="Expiry Date" className="input" />
        <input {...register('cvv', { required: true, pattern: /^[0-9]{3}$/ })} placeholder="CVV" className="input" />
        {errors.cvv && <p className="text-red-500 text-sm">Enter 3-digit CVV</p>}

        <select {...register('status')} onChange={(e) => setStatus(e.target.value)} className="input">
          <option value="approved">1 - Approved</option>
          <option value="declined">2 - Declined</option>
          <option value="failed">3 - Failed</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Place Order</button>
      </form>

      <div>
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <p><strong>Product:</strong> {product.name}</p>
          <p><strong>Variant:</strong> {product.variant}</p>
          <p><strong>Quantity:</strong> {product.quantity}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Total:</strong> ₹{total}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
