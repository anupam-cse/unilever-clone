import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(formData.username, formData.password);
        
        setLoading(false);

        if (result.success) {
            navigate('/');  // লগইন সফল হলে হোম পেজে যাবে
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
            <form 
                onSubmit={handleSubmit} 
                className="bg-white p-8 rounded-xl shadow-md w-96 border-t-4 border-blue-700"
            >
                <h2 className="text-2xl font-black text-blue-800 mb-6 text-center">
                    WELCOME BACK
                </h2>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <input 
                    type="text" 
                    placeholder="Username" 
                    className="w-full border p-3 rounded mb-4 outline-none focus:border-blue-500"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})} 
                    required 
                />

                <input 
                    type="password" 
                    placeholder="Password" 
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
                    {loading ? 'LOGGING IN...' : 'LOGIN'}
                </button>

                <p className="mt-4 text-sm text-center">
                    Don't have an account? 
                    <Link to="/signup" className="text-blue-700 font-bold ml-1">Sign Up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;