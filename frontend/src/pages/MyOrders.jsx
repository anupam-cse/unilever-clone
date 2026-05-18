import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const MyOrders = () => {
    const { token } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/orders/my-orders/', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            setOrders(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
    }, []);

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-700',
            processing: 'bg-blue-100 text-blue-700',
            shipped: 'bg-purple-100 text-purple-700',
            delivered: 'bg-green-100 text-green-700',
            cancelled: 'bg-red-100 text-red-700'
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-5xl mx-auto px-4">
                <h1 className="text-3xl font-black text-gray-800 mb-8">My Orders</h1>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl p-10 text-center">
                        <p className="text-6xl mb-4">📦</p>
                        <p className="text-xl text-gray-500 mb-4">No orders yet</p>
                        <Link to="/" className="bg-blue-700 text-white px-6 py-3 rounded-lg inline-block">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <div key={order.id} className="bg-white rounded-2xl shadow-md p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Order ID</p>
                                        <p className="text-xl font-black text-blue-700">#{order.id}</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className={`px-4 py-2 rounded-full font-bold uppercase text-xs ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>

                                <div className="border-t pt-4">
                                    <div className="space-y-2 mb-4">
                                        {order.items.slice(0, 2).map(item => (
                                            <div key={item.id} className="flex justify-between text-sm">
                                                <span>{item.product_name} × {item.quantity}</span>
                                                <span className="font-semibold">৳{item.subtotal}</span>
                                            </div>
                                        ))}
                                        {order.items.length > 2 && (
                                            <p className="text-xs text-gray-500">+ {order.items.length - 2} more items</p>
                                        )}
                                    </div>

                                    <div className="flex justify-between items-center border-t pt-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Total</p>
                                            <p className="text-2xl font-black text-blue-700">৳{order.total_price}</p>
                                        </div>
                                        <Link 
                                            to={`/order-success/${order.id}`}
                                            className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;