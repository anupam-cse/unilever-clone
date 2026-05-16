import { useCart } from '../context/CartContext';

const CartSidebar = () => {
  const { cart, removeFromCart, totalPrice, isCartOpen, setIsCartOpen } = useCart();

  return (
    <>
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[60] transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 flex flex-col h-full">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-bold">Your Basket</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-3xl text-gray-400">&times;</button>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            {cart.length === 0 ? (
              <p className="text-center text-gray-400 mt-10">Your cart is empty</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="flex items-center justify-between mb-4 border-b pb-2">
                  <div className="flex items-center gap-3">
                    <img src={`http://127.0.0.1:8000${item.image}`} className="w-10 h-10 object-contain" />
                    <p className="text-xs font-bold truncate w-32">{item.name}</p>
                  </div>
                  <button onClick={() => removeFromCart(index)} className="text-red-500 text-xs">Remove</button>
                </div>
              ))
            )}
          </div>
          <div className="border-t pt-4">
            <p className="flex justify-between font-black text-lg mb-4">
              <span>Total:</span> <span>৳{totalPrice.toFixed(2)}</span>
            </p>
            <button className="w-full bg-blue-700 text-white py-3 rounded-xl font-bold uppercase">Checkout</button>
          </div>
        </div>
      </div>
      {isCartOpen && <div onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black opacity-30 z-50"></div>}
    </>
  );
};

export default CartSidebar;