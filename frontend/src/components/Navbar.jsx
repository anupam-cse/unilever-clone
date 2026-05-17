import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const { cart, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b-4 border-blue-700 shadow-sm sticky top-0 z-50 p-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-black text-blue-800 uppercase tracking-tighter">
          Unilever
        </Link>

        <input
          type="text"
          placeholder="Search brands or products..."
          className="w-full md:w-96 border border-gray-300 px-5 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex items-center gap-4 font-bold text-sm uppercase">

          {user ? (
            // ইউজার লগইন থাকলে
            <>
              <span className="text-gray-700">
                👋 Hi, <span className="text-blue-700">{user.username}</span>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            // ইউজার লগইন না থাকলে
            <>
              <Link to="/login" className="text-blue-700 hover:underline">Login</Link>
              <Link to="/signup" className="bg-blue-700 text-white px-4 py-2 rounded-lg">Sign Up</Link>
            </>
          )}

          <button
            onClick={() => setIsCartOpen(true)}
            className="text-blue-700 border border-blue-200 px-4 py-2 rounded-lg bg-blue-50"
          >
            Cart ({cart.total_items || 0})  {/* cart.length এর বদলে */}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;