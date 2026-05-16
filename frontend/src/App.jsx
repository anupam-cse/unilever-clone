import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          
          {/* ১. Navbar - সবার উপরে */}
          <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          {/* ২. Cart Sidebar */}
          <CartSidebar />

          {/* ৩. Main Content - মাঝে */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home searchTerm={searchTerm} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>

          {/* ৪. Footer - সবার নিচে */}
          <Footer />

        </div>
      </CartProvider>
    </Router>
  );
}

export default App;