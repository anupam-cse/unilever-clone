import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const CartSidebar = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen } = useCart();
  const { user } = useAuth();

  return (
    <>
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-[60] transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 flex flex-col h-full">
          
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-bold">Your Basket ({cart.total_items || 0})</h2>
            <button 
              onClick={() => setIsCartOpen(false)} 
              className="text-3xl text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto py-4">
            
            {!user ? (
              <div className="text-center mt-10">
                <p className="text-gray-500 mb-4">Please login to see your cart</p>
                <Link 
                  to="/login" 
                  onClick={() => setIsCartOpen(false)}
                  className="bg-blue-700 text-white px-6 py-2 rounded-lg inline-block"
                >
                  Login Now
                </Link>
              </div>
            ) : cart.items?.length === 0 ? (
              <div className="text-center mt-10">
                <p className="text-6xl mb-4">🛒</p>
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              cart.items?.map((item) => (
                <div key={item.id} className="flex items-center gap-3 mb-4 border-b pb-3">
                  <img 
                    src={`http://127.0.0.1:8000${item.product.image}`} 
                    className="w-16 h-16 object-contain" 
                    alt={item.product.name}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-bold truncate">{item.product.name}</p>
                    <p className="text-xs text-gray-500">৳{item.product.price}</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 bg-gray-200 rounded text-sm font-bold hover:bg-gray-300"
                      >
                        −
                      </button>
                      <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 bg-gray-200 rounded text-sm font-bold hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">৳{item.subtotal}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="text-red-500 text-xs mt-2 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {user && cart.items?.length > 0 && (
            <div className="border-t pt-4">
              <p className="flex justify-between font-black text-lg mb-4">
                <span>Total:</span> 
                <span>৳{parseFloat(cart.total_price || 0).toFixed(2)}</span>
              </p>
              <button className="w-full bg-blue-700 text-white py-3 rounded-xl font-bold uppercase mb-2 hover:bg-blue-800">
                Checkout
              </button>
              <button 
                onClick={clearCart}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-xl font-bold uppercase text-sm hover:bg-gray-300"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
      
      {isCartOpen && (
        <div 
          onClick={() => setIsCartOpen(false)} 
          className="fixed inset-0 bg-black opacity-30 z-50"
        ></div>
      )}
    </>
  );
};

export default CartSidebar;