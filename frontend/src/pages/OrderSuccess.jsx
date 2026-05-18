import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const OrderSuccess = () => {
    const { orderId } = useParams();
    const { token } = useAuth();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/orders/${orderId}/`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setOrder(res.data))
        .catch(err => console.log(err));
    }, [orderId]);

    if (!order) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-3xl mx-auto px-4">
                
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                    <div className="text-7xl mb-4">✅</div>
                    <h1 className="text-3xl font-black text-green-600 mb-2">Order Placed Successfully!</h1>
                    <p className="text-gray-600 mb-6">Thank you for your order. We'll deliver it soon!</p>
                    
                    <div className="bg-blue-50 p-4 rounded-lg inline-block">
                        <p className="text-sm text-gray-600">Order ID</p>
                        <p className="text-2xl font-black text-blue-700">#{order.id}</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
                    <h2 className="text-xl font-bold mb-4">Order Details</h2>
                    
                    <div className="space-y-3 mb-6">
                        {order.items.map(item => (
                            <div key={item.id} className="flex items-center gap-3 pb-3 border-b">
                                <div className="flex-1">
                                    <p className="font-semibold">{item.product_name}</p>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity} × ৳{item.price}</p>
                                </div>
                                <p className="font-bold">৳{item.subtotal}</p>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="font-bold mb-2">Shipping Address</h3>
                        <p className="text-gray-600">
                            {order.full_name}<br/>
                            {order.address}, {order.city} - {order.postal_code}<br/>
                            📞 {order.phone}
                        </p>
                    </div>

                    <div className="border-t mt-4 pt-4 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Payment Method</p>
                            <p className="font-bold uppercase">{order.payment_method}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Total Amount</p>
                            <p className="text-2xl font-black text-blue-700">৳{order.total_price}</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mt-6">
                    <Link 
                        to="/my-orders"
                        className="flex-1 bg-blue-700 text-white py-3 rounded-xl font-bold uppercase text-center hover:bg-blue-800"
                    >
                        My Orders
                    </Link>
                    <Link 
                        to="/"
                        className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold uppercase text-center hover:bg-gray-300"
                    >
                        Continue Shopping
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default OrderSuccess;