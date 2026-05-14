import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // ব্রাউজারে আগে থেকে টোকেন সেভ করা থাকলে সেটা নিবে
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(null);

    // লগইন ফাংশন
    const login = async (username, password) => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/login/", {
                username,
                password,
            });
            setToken(res.data.access);
            localStorage.setItem("token", res.data.access);
            return { success: true };
        } catch (error) {
            return { success: false, message: "Invalid credentials" };
        }
    };

    // লগআউট ফাংশন
    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;