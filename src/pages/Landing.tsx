
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { sampleProduct } from '@/data/products';
import { ProductVariant } from '@/types/product';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState<ProductVariant>(sampleProduct.variants.color[0]);
  const [selectedSize, setSelectedSize] = useState<ProductVariant>(sampleProduct.variants.size[0]);
  const [quantity, setQuantity] = useState(1);

  const totalPrice = (sampleProduct.basePrice + selectedColor.price + selectedSize.price) * quantity;

  const handleBuyNow = () => {
    addToCart(sampleProduct, { color: selectedColor, size: selectedSize }, quantity);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-xl">
                <img 
                  src={sampleProduct.image} 
                  alt={sampleProduct.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden bg-white shadow-md opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                    <img 
                      src={sampleProduct.image} 
                      alt={`${sampleProduct.name} view ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  ✨ Premium Quality
                </Badge>
                <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                  {sampleProduct.name}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {sampleProduct.description}
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-blue-600">
                    ${totalPrice.toFixed(2)}
                  </span>
                  {totalPrice !== sampleProduct.basePrice && (
                    <span className="text-xl text-gray-400 line-through">
                      ${sampleProduct.basePrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Color Selection */}
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Choose Color</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {sampleProduct.variants.color.map((color) => (
                      <label key={color.id} className="cursor-pointer">
                        <input
                          type="radio"
                          name="color"
                          value={color.id}
                          checked={selectedColor.id === color.id}
                          onChange={() => setSelectedColor(color)}
                          className="sr-only"
                        />
                        <div className={`p-4 rounded-xl border-2 transition-all ${
                          selectedColor.id === color.id 
                            ? 'border-blue-500 bg-blue-50 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{color.value}</span>
                            {color.price > 0 && (
                              <span className="text-green-600 font-semibold">+${color.price}</span>
                            )}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Size Selection */}
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Choose Size</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {sampleProduct.variants.size.map((size) => (
                      <label key={size.id} className="cursor-pointer">
                        <input
                          type="radio"
                          name="size"
                          value={size.id}
                          checked={selectedSize.id === size.id}
                          onChange={() => setSelectedSize(size)}
                          className="sr-only"
                        />
                        <div className={`p-4 rounded-xl border-2 transition-all ${
                          selectedSize.id === size.id 
                            ? 'border-blue-500 bg-blue-50 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{size.value}</span>
                            {size.price > 0 && (
                              <span className="text-green-600 font-semibold">+${size.price}</span>
                            )}
                            {size.price < 0 && (
                              <span className="text-red-600 font-semibold">${size.price}</span>
                            )}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quantity and Buy Now */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Quantity</h3>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="w-12 h-12 rounded-full"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-2xl font-semibold w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 rounded-full"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={handleBuyNow}
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ShoppingCart className="w-5 h-5 mr-3" />
                  Buy Now - ${totalPrice.toFixed(2)}
                </Button>

                <div className="text-center text-sm text-gray-500">
                  Free shipping on orders over $150 • 30-day returns
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
