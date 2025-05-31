
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Order } from '@/types/product';
import { CheckCircle, XCircle, AlertTriangle, ArrowLeft, Mail, Package } from 'lucide-react';

const ThankYou = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Fetch order from localStorage (simulating database fetch)
    const orderData = localStorage.getItem('lastOrder');
    if (orderData) {
      setOrder(JSON.parse(orderData));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-8 h-8 text-green-600" />;
      case 'declined':
        return <XCircle className="w-8 h-8 text-red-600" />;
      case 'failed':
        return <AlertTriangle className="w-8 h-8 text-yellow-600" />;
      default:
        return <CheckCircle className="w-8 h-8 text-green-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 border-green-200">✅ Payment Approved</Badge>;
      case 'declined':
        return <Badge className="bg-red-100 text-red-800 border-red-200">❌ Payment Declined</Badge>;
      case 'failed':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">⚠️ Gateway Error</Badge>;
      default:
        return <Badge className="bg-green-100 text-green-800 border-green-200">✅ Payment Approved</Badge>;
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          title: 'Order Confirmed! 🎉',
          message: 'Thank you for your purchase! Your order has been successfully processed and you will receive a confirmation email shortly.',
          color: 'text-green-800'
        };
      case 'declined':
        return {
          title: 'Payment Declined 😔',
          message: 'Unfortunately, your payment was declined. Please check your payment information and try again, or contact your bank for assistance.',
          color: 'text-red-800'
        };
      case 'failed':
        return {
          title: 'Payment Gateway Error ⚠️',
          message: 'We encountered a technical issue while processing your payment. Please try again in a few moments or contact our support team.',
          color: 'text-yellow-800'
        };
      default:
        return {
          title: 'Order Confirmed! 🎉',
          message: 'Thank you for your purchase! Your order has been successfully processed and you will receive a confirmation email shortly.',
          color: 'text-green-800'
        };
    }
  };

  const statusInfo = getStatusMessage(order.status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              {getStatusIcon(order.status)}
            </div>
            <h1 className={`text-3xl font-bold mb-2 ${statusInfo.color}`}>
              {statusInfo.title}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {statusInfo.message}
            </p>
          </div>

          {/* Order Status */}
          <Card className="shadow-lg border-0 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm text-gray-600">Order Number</p>
                  <p className="text-2xl font-bold text-gray-900">{order.orderNumber}</p>
                </div>
                {getStatusBadge(order.status)}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Order Details */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.selectedVariants.color.value} • {item.selectedVariants.size.value}
                      </p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="font-semibold text-blue-600">${item.totalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer & Payment Info */}
            <div className="space-y-6">
              {/* Customer Information */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-semibold">{order.customer.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">{order.customer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold">{order.customer.phone}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <p className="font-semibold">{order.customer.fullName}</p>
                    <p>{order.customer.address}</p>
                    <p>{order.customer.city}, {order.customer.state} {order.customer.zipCode}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Card Number</span>
                      <span className="font-mono">{order.payment.cardNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Expiry</span>
                      <span>{order.payment.expiryDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Email Notification */}
          {order.status === 'approved' && (
            <Card className="shadow-lg border-0 mb-6 bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-900">Confirmation Email Sent</p>
                    <p className="text-sm text-blue-700">
                      A confirmation email has been sent to {order.customer.email} with your order details and tracking information.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Button>
            
            {order.status !== 'approved' && (
              <Button 
                onClick={() => navigate('/checkout')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                Try Again
              </Button>
            )}
          </div>

          {/* Order Date */}
          <div className="text-center mt-8 text-sm text-gray-500">
            Order placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
