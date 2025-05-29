const Product = require('../models/Product');

const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {getProduct};
