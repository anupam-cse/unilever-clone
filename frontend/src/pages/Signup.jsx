import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/accounts/register/', formData);
            alert("Account created! Now please login.");
            navigate('/login');
        } catch (error) {
            alert("Error creating account. Try another username.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-96 border-t-4 border-blue-700">
                <h2 className="text-2xl font-black text-blue-800 mb-6 text-center">CREATE ACCOUNT</h2>
                <input type="text" placeholder="Username" className="w-full border p-3 rounded mb-4 outline-none focus:border-blue-500" 
                    onChange={(e) => setFormData({...formData, username: e.target.value})} required />
                <input type="email" placeholder="Email" className="w-full border p-3 rounded mb-4 outline-none focus:border-blue-500" 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                <input type="password" placeholder="Password" className="w-full border p-3 rounded mb-6 outline-none focus:border-blue-500" 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                <button type="submit" className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition">SIGN UP</button>
                <p className="mt-4 text-sm text-center">Already have an account? <a href="/login" className="text-blue-700 font-bold">Login</a></p>
            </form>
        </div>
    );
};

export default Signup;