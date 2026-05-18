import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetails from './pages/ProductDetails';  // নতুন
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import MyOrders from './pages/MyOrders';


function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <CartSidebar />

          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home searchTerm={searchTerm} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/product/:id" element={<ProductDetails />} />  {/* নতুন */}


              // Routes এর ভেতরে যোগ করুন:
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success/:orderId" element={<OrderSuccess />} />
              <Route path="/my-orders" element={<MyOrders />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;