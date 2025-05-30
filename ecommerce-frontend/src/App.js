import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext';

import LandingPage from './pages/LandingPage';
import CheckoutPage from './pages/CheckoutPage';
import ThankYouPage from './pages/ThankYouPage';

function App() {
  return (
    <OrderProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </Router>
    </OrderProvider>
  );
}

export default App;
