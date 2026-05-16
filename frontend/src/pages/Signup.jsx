import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await axios.post('http://127.0.0.1:8000/api/accounts/register/', formData);
            alert("Account created successfully! Please login.");
            navigate('/login');
        } catch (err) {
            // Backend থেকে আসা আসল error দেখাই
            if (err.response && err.response.data) {
                const errors = err.response.data;
                let errorMsg = '';
                
                // সব error message একসাথে দেখাই
                Object.keys(errors).forEach(key => {
                    errorMsg += `${key}: ${errors[key].join(', ')}\n`;
                });
                
                setError(errorMsg);
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
            <form 
                onSubmit={handleSubmit} 
                className="bg-white p-8 rounded-xl shadow-md w-96 border-t-4 border-blue-700"
            >
                <h2 className="text-2xl font-black text-blue-800 mb-6 text-center">
                    CREATE ACCOUNT
                </h2>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm whitespace-pre-line">
                        {error}
                    </div>
                )}

                <input 
                    type="text" 
                    placeholder="Username (no spaces)" 
                    className="w-full border p-3 rounded mb-4 outline-none focus:border-blue-500" 
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})} 
                    required 
                />

                <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full border p-3 rounded mb-4 outline-none focus:border-blue-500" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    required 
                />

                <input 
                    type="password" 
                    placeholder="Password (min 8 characters)" 
                    className="w-full border p-3 rounded mb-6 outline-none focus:border-blue-500" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                    required 
                />

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition disabled:opacity-50"
                >
                    {loading ? 'CREATING...' : 'SIGN UP'}
                </button>

                <p className="mt-4 text-sm text-center">
                    Already have an account? 
                    <Link to="/login" className="text-blue-700 font-bold ml-1">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;