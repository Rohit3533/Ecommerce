
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product, ProductVariant } from '@/types/product';

interface CartContextType {
  cartItem: CartItem | null;
  addToCart: (product: Product, variants: { color: ProductVariant; size: ProductVariant }, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItem, setCartItem] = useState<CartItem | null>(null);

  const addToCart = (product: Product, variants: { color: ProductVariant; size: ProductVariant }, quantity: number) => {
    const totalPrice = (product.basePrice + variants.color.price + variants.size.price) * quantity;
    
    const newCartItem: CartItem = {
      product,
      selectedVariants: variants,
      quantity,
      totalPrice
    };
    
    setCartItem(newCartItem);
  };

  const clearCart = () => {
    setCartItem(null);
  };

  return (
    <CartContext.Provider value={{ cartItem, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
