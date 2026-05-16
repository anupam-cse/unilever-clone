import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // টোকেন থাকলে ইউজার ইনফো নিয়ে আসবে
    useEffect(() => {
        if (token) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [token]);

    const fetchUser = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/accounts/profile/", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(res.data);
        } catch (error) {
            console.log("Failed to fetch user", error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    // লগইন ফাংশন
    const login = async (username, password) => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/login/", {
                username,
                password,
            });
            setToken(res.data.access);
            localStorage.setItem("token", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);
            return { success: true };
        } catch (error) {
            return { success: false, message: "Invalid username or password" };
        }
    };

    // লগআউট ফাংশন
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook (সহজে ব্যবহারের জন্য)
export const useAuth = () => useContext(AuthContext);

export default AuthContext;