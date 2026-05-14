import { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products/list/')
      .then(res => setProducts(res.data))
  }, [])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price), 0);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        
        {/* --- মেইন NAVBAR (সব পেজের জন্য এক) --- */}
        <nav className="bg-white border-b-4 border-blue-700 shadow-sm sticky top-0 z-50 p-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/" className="text-2xl font-black text-blue-800 uppercase tracking-tighter">Unilever</Link>

            {/* সার্চ বার */}
            <input
              type="text"
              placeholder="Search brands or products..."
              className="w-full md:w-96 border border-gray-300 px-5 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="flex items-center gap-6 font-bold text-sm uppercase">
              <Link to="/login" className="text-blue-700 hover:underline">Login</Link>
              <Link to="/signup" className="bg-blue-700 text-white px-4 py-2 rounded-lg">Sign Up</Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="text-blue-700 border border-blue-200 px-4 py-2 rounded-lg bg-blue-50"
              >
                Cart ({cart.length})
              </button>
            </div>
          </div>
        </nav>

        {/* --- CART SIDEBAR --- */}
        <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[60] transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-5 flex flex-col h-full">
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-xl font-bold">Your Basket</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-3xl text-gray-400">&times;</button>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              {cart.map((item, index) => (
                <div key={index} className="flex items-center justify-between mb-4 border-b pb-2">
                  <div className="flex items-center gap-3">
                    <img src={`http://127.0.0.1:8000${item.image}`} className="w-10 h-10 object-contain" />
                    <p className="text-xs font-bold truncate w-32">{item.name}</p>
                  </div>
                  <button onClick={() => removeFromCart(index)} className="text-red-500 text-xs">Remove</button>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <p className="flex justify-between font-black text-lg mb-4"><span>Total:</span> <span>৳{totalPrice.toFixed(2)}</span></p>
              <button className="w-full bg-blue-700 text-white py-3 rounded-xl font-bold uppercase">Checkout</button>
            </div>
          </div>
        </div>
        {isCartOpen && <div onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black opacity-30 z-50"></div>}

        {/* --- ROUTES (পেজ পরিবর্তন হবে এখানে) --- */}
        <Routes>
          {/* হোম পেজ */}
          <Route path="/" element={
            <main className="max-w-7xl mx-auto py-10 px-4">
              <p className="text-center mb-6 text-gray-400 italic">Showing {filteredProducts.length} products</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white p-4 rounded-xl shadow-md border flex flex-col">
                    <img src={`http://127.0.0.1:8000${product.image}`} className="h-40 w-full object-contain mb-3" />
                    <h4 className="text-[10px] font-black text-blue-700 uppercase">{product.brand_name}</h4>
                    <p className="font-bold text-sm h-10 overflow-hidden mb-4">{product.name}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-lg font-black">৳{product.price}</span>
                      <button onClick={() => addToCart(product)} className="bg-blue-700 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase">Add</button>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          } />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

      </div>
    </Router>
  )
}

export default App