import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
    const { cart } = useCart();
    const { token, user } = useAuth();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        email: user?.email || '',
        address: '',
        city: '',
        postal_code: '',
        payment_method: 'cod',
        notes: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Cart empty হলে home এ পাঠাও
    if (!cart.items || cart.items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p className="text-6xl mb-4">🛒</p>
                <p className="text-2xl text-gray-500 mb-4">Your cart is empty</p>
                <button 
                    onClick={() => navigate('/')}
                    className="bg-blue-700 text-white px-6 py-3 rounded-lg"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await axios.post(
                'http://127.0.0.1:8000/api/orders/place/',
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            // Order success page এ পাঠাও
            navigate(`/order-success/${res.data.id}`);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-black text-gray-800 mb-8">Checkout</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* Left: Shipping Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6">
                            <h2 className="text-xl font-bold mb-4">Shipping Information</h2>

                            {error && (
                                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
                            )}

                            <div className="grid md:grid-cols-2 gap-4">
                                <input 
                                    type="text" placeholder="Full Name *" required
                                    className="border p-3 rounded outline-none focus:border-blue-500"
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                                />
                                <input 
                                    type="tel" placeholder="Phone Number *" required
                                    className="border p-3 rounded outline-none focus:border-blue-500"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                />
                                <input 
                                    type="email" placeholder="Email *" required
                                    className="border p-3 rounded outline-none focus:border-blue-500 md:col-span-2"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                                <textarea 
                                    placeholder="Full Address *" required rows="3"
                                    className="border p-3 rounded outline-none focus:border-blue-500 md:col-span-2"
                                    value={formData.address}
                                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                                />
                                <input 
                                    type="text" placeholder="City *" required
                                    className="border p-3 rounded outline-none focus:border-blue-500"
                                    value={formData.city}
                                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                                />
                                <input 
                                    type="text" placeholder="Postal Code *" required
                                    className="border p-3 rounded outline-none focus:border-blue-500"
                                    value={formData.postal_code}
                                    onChange={(e) => setFormData({...formData, postal_code: e.target.value})}
                                />
                                <textarea 
                                    placeholder="Order Notes (optional)" rows="2"
                                    className="border p-3 rounded outline-none focus:border-blue-500 md:col-span-2"
                                    value={formData.notes}
                                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                />
                            </div>

                            {/* Payment Method */}
                            <h2 className="text-xl font-bold mb-4 mt-8">Payment Method</h2>
                            <div className="space-y-3">
                                {[
                                    { value: 'cod', label: '💵 Cash on Delivery' },
                                    { value: 'bkash', label: '📱 bKash' },
                                    { value: 'card', label: '💳 Credit/Debit Card' }
                                ].map(method => (
                                    <label 
                                        key={method.value}
                                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                                            formData.payment_method === method.value 
                                                ? 'border-blue-700 bg-blue-50' 
                                                : 'border-gray-200'
                                        }`}
                                    >
                                        <input 
                                            type="radio" 
                                            name="payment" 
                                            value={method.value}
                                            checked={formData.payment_method === method.value}
                                            onChange={(e) => setFormData({...formData, payment_method: e.target.value})}
                                            className="mr-3"
                                        />
                                        <span className="font-semibold">{method.label}</span>
                                    </label>
                                ))}
                            </div>

                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold uppercase mt-6 hover:bg-blue-800 disabled:opacity-50"
                            >
                                {loading ? 'Placing Order...' : `Place Order - ৳${cart.total_price}`}
                            </button>
                        </form>
                    </div>

                    {/* Right: Order Summary */}
                    <div>
                        <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
                            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                            
                            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                                {cart.items.map(item => (
                                    <div key={item.id} className="flex items-center gap-3 pb-3 border-b">
                                        <img 
                                            src={`http://127.0.0.1:8000${item.product.image}`}
                                            className="w-14 h-14 object-contain"
                                            alt={item.product.name}
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold truncate">{item.product.name}</p>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-bold text-sm">৳{item.subtotal}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal:</span>
                                    <span>৳{cart.total_price}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping:</span>
                                    <span className="text-green-600">FREE</span>
                                </div>
                                <div className="flex justify-between text-xl font-black border-t pt-2">
                                    <span>Total:</span>
                                    <span className="text-blue-700">৳{cart.total_price}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;