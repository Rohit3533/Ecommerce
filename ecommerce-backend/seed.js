const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const seedProduct = async () => {
  await Product.deleteMany();

  const product = new Product({
    title: 'Converse All-Star II',
    description: 'Classic high-top sneaker with red canvas.',
    image: 'https://example.com/converse-red.jpg',
    price: 4999,
    variants: [
      { color: 'Red', size: '9', stock: 10 },
      { color: 'Black', size: '10', stock: 5 },
    ],
  });

  await product.save();
  console.log('Product seeded');
  process.exit();
};

seedProduct();
