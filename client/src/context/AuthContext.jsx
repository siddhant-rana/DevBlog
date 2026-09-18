import { createContext, useEffect, useState } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('devblog_user');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });

    const [token, setToken] = useState(() =>
        localStorage.getItem('devblog_token')
    );

    const [loading, setLoading] = useState(false);

    // Save/remove token
    useEffect(() => {
        if (token) {
            localStorage.setItem('devblog_token', token);
        } else {
            localStorage.removeItem('devblog_token');
        }
    }, [token]);

    // Save/remove user
    useEffect(() => {
        if (user) {
            localStorage.setItem('devblog_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('devblog_user');
        }
    }, [user]);

    // Save login session
    const saveSession = (authToken, authUser) => {
        setToken(authToken);
        setUser(authUser);
    };

    // Restore session after page refresh
    useEffect(() => {
        const restoreSession = async () => {
            const savedToken = localStorage.getItem('devblog_token');

            if (!savedToken) {
                return;
            }

            try {
                const { data } = await API.get('/auth/me');

                if (data?.user) {
                    setUser(data.user);
                }
            } catch (error) {
                console.error('Session restore failed:', error);

                localStorage.removeItem('devblog_token');
                localStorage.removeItem('devblog_user');

                setToken(null);
                setUser(null);
            }
        };

        restoreSession();
    }, []);

    // Normal login
    const login = async (email, password) => {
        setLoading(true);

        try {
            const { data } = await API.post('/auth/login', {
                email,
                password,
            });

            saveSession(data.token, data.user);

            return data;
        } finally {
            setLoading(false);
        }
    };

    // Register
    const register = async (name, email, password) => {
        setLoading(true);

        try {
            const { data } = await API.post('/auth/register', {
                name,
                email,
                password,
            });

            return data;
        } finally {
            setLoading(false);
        }
    };

    // Google login
    const googleLogin = async (credential) => {
        setLoading(true);

        try {
            const { data } = await API.post('/auth/google', {
                credential,
            });

            saveSession(data.token, data.user);

            return data;
        } finally {
            setLoading(false);
        }
    };

    // Logout
    const logout = () => {
        setToken(null);
        setUser(null);

        localStorage.removeItem('devblog_token');
        localStorage.removeItem('devblog_user');
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
