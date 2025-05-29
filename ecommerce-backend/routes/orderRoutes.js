const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/orderController');

router.post('/', async (req, res) => {
  try {
    console.log('Incoming order request body:', req.body);
    const savedOrder = await createOrder(req.body); // ✅ Pass full body
    res.status(201).json({ order: savedOrder });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
