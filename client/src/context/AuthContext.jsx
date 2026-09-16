import { createContext, useEffect, useState } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('devblog_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem('devblog_token'));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            localStorage.setItem('devblog_token', token);
        } else {
            localStorage.removeItem('devblog_token');
        }
    }, [token]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('devblog_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('devblog_user');
        }
    }, [user]);

    const saveSession = (authToken, authUser) => {
        setToken(authToken);
        setUser(authUser);
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            const { data } = await API.post('/auth/login', { email, password });
            saveSession(data.token, data.user);
            return data;
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password) => {
        setLoading(true);
        try {
            const { data } = await API.post('/auth/register', { name, email, password });
            return data;
        } finally {
            setLoading(false);
        }
    };

    const googleLogin = async (credential) => {
        setLoading(true);
        try {
            const { data } = await API.post('/auth/google', { credential });
            saveSession(data.token, data.user);
            return data;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                register,
                googleLogin,
                logout,
                isAuthenticated: Boolean(token && user),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

