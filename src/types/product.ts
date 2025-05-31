
export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  variants: {
    color: ProductVariant[];
    size: ProductVariant[];
  };
  inventory: number;
}

export interface CartItem {
  product: Product;
  selectedVariants: {
    color: ProductVariant;
    size: ProductVariant;
  };
  quantity: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  payment: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
  items: CartItem[];
  subtotal: number;
  total: number;
  status: 'approved' | 'declined' | 'failed';
  createdAt: Date;
}
