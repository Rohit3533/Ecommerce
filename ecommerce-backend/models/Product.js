const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
  variants: [
    {
      color: String,
      size: String,
      stock: Number
    }
  ]
});

module.exports = mongoose.model('Product', productSchema);
