const sendEmail = require('../utils/Email'); // ✅ Use lowercase 'email.js'
const Order = require('../models/Order');     // ✅ Assuming you have an Order model

const createOrder = async (orderData) => {
  // Save order to DB
  const savedOrder = await Order.create(orderData);

  // Prepare email content
  let subject, html;

  if (orderData.status === 'approved') {
    subject = `Order Confirmation - ${orderData.orderNumber}`;
    html = `
      <h2>Thanks for your order!</h2>
      <p>Order Number: <strong>${orderData.orderNumber}</strong></p>
      <p>Product: ${orderData.product.name}</p>
      <p>Variant: ${orderData.product.variant}</p>
      <p>Quantity: ${orderData.product.quantity}</p>
      <p>Total: ₹${orderData.product.price * orderData.product.quantity}</p>
    `;
  } else {
    subject = `Transaction Failed - Order Not Placed`;
    html = `
      <h2>We're sorry!</h2>
      <p>Your transaction was <strong>${orderData.status}</strong>.</p>
      <p>Please try again or contact support.</p>
    `;
  }

  // Send email
  await sendEmail({
    to: orderData.email,
    subject,
    html,
  });

  // Return the saved order
  return savedOrder;
};

module.exports = { createOrder };
