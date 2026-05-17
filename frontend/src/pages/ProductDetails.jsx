import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();  // URL থেকে product id নেওয়া
    const navigate = useNavigate();
    const { addToCart, setIsCartOpen } = useCart();
    
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/products/detail/${id}/`)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [id]);

    const handleAddToCart = () => {
        // Multiple quantity add করার জন্য
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        setIsCartOpen(true);  // Cart sidebar খুলে দাও
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate('/checkout');  // future এ checkout পেজ হবে
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-2xl text-gray-500">Loading...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p className="text-2xl text-red-500 mb-4">Product not found</p>
                <Link to="/" className="bg-blue-700 text-white px-6 py-2 rounded-lg">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-7xl mx-auto px-4">
                
                {/* Breadcrumb */}
                <div className="mb-6 text-sm text-gray-600">
                    <Link to="/" className="hover:text-blue-700">Home</Link>
                    <span className="mx-2">›</span>
                    <span className="text-blue-700 font-semibold">{product.name}</span>
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-8 p-8">
                        
                        {/* Left: Product Image */}
                        <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center">
                            <img 
                                src={`http://127.0.0.1:8000${product.image}`} 
                                alt={product.name}
                                className="max-h-96 object-contain"
                            />
                        </div>

                        {/* Right: Product Info */}
                        <div className="flex flex-col">
                            
                            {/* Brand */}
                            <p className="text-blue-700 font-bold uppercase tracking-wider text-sm mb-2">
                                {product.brand_name || 'Unilever'}
                            </p>

                            {/* Product Name */}
                            <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-4">
                                {product.name}
                            </h1>

                            {/* Rating (static for now) */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex text-yellow-400">
                                    {'★★★★★'.split('').map((star, i) => (
                                        <span key={i}>{star}</span>
                                    ))}
                                </div>
                                <span className="text-gray-500 text-sm">(120 reviews)</span>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <span className="text-4xl font-black text-blue-700">
                                    ৳{product.price}
                                </span>
                                <span className="text-gray-400 line-through ml-3 text-lg">
                                    ৳{(parseFloat(product.price) * 1.2).toFixed(2)}
                                </span>
                                <span className="ml-3 bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">
                                    20% OFF
                                </span>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h3 className="font-bold text-gray-800 mb-2">Description</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {product.description || 'No description available.'}
                                </p>
                            </div>

                            {/* Stock Status */}
                            <div className="mb-6">
                                {product.stock > 0 ? (
                                    <p className="text-green-600 font-semibold">
                                        ✓ In Stock ({product.stock} available)
                                    </p>
                                ) : (
                                    <p className="text-red-600 font-semibold">
                                        ✗ Out of Stock
                                    </p>
                                )}
                            </div>

                            {/* Quantity Selector */}
                            <div className="mb-6">
                                <h3 className="font-bold text-gray-800 mb-2">Quantity</h3>
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 bg-gray-200 rounded-lg font-bold hover:bg-gray-300"
                                    >
                                        −
                                    </button>
                                    <span className="text-xl font-bold w-12 text-center">
                                        {quantity}
                                    </span>
                                    <button 
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 bg-gray-200 rounded-lg font-bold hover:bg-gray-300"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 mt-auto">
                                <button 
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                    className="flex-1 bg-blue-700 text-white py-4 rounded-xl font-bold uppercase hover:bg-blue-800 transition disabled:bg-gray-400"
                                >
                                    🛒 Add to Cart
                                </button>
                                <button 
                                    onClick={handleBuyNow}
                                    disabled={product.stock === 0}
                                    className="flex-1 bg-yellow-400 text-blue-900 py-4 rounded-xl font-bold uppercase hover:bg-yellow-500 transition disabled:bg-gray-400"
                                >
                                    ⚡ Buy Now
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="grid md:grid-cols-3 gap-4 mt-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                        <div className="text-4xl mb-2">🚚</div>
                        <h4 className="font-bold mb-1">Free Delivery</h4>
                        <p className="text-sm text-gray-500">On orders over ৳500</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                        <div className="text-4xl mb-2">↩️</div>
                        <h4 className="font-bold mb-1">Easy Returns</h4>
                        <p className="text-sm text-gray-500">7-day return policy</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                        <div className="text-4xl mb-2">🔒</div>
                        <h4 className="font-bold mb-1">Secure Payment</h4>
                        <p className="text-sm text-gray-500">100% safe checkout</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetails;