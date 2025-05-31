
import { Product } from '@/types/product';

export const sampleProduct: Product = {
  id: '1',
  name: 'Premium Wireless Headphones',
  description: 'Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort for all-day listening.',
  basePrice: 199.99,
  image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
  variants: {
    color: [
      { id: 'black', name: 'Color', value: 'Midnight Black', price: 0 },
      { id: 'white', name: 'Color', value: 'Pearl White', price: 10 },
      { id: 'blue', name: 'Color', value: 'Ocean Blue', price: 15 }
    ],
    size: [
      { id: 'standard', name: 'Size', value: 'Standard', price: 0 },
      { id: 'compact', name: 'Size', value: 'Compact', price: -20 },
      { id: 'pro', name: 'Size', value: 'Pro Max', price: 50 }
    ]
  },
  inventory: 100
};
