import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    // Cargar usuario al iniciar
    useEffect(() => {
        axios.get('/api/auth/me', { withCredentials: true })
        .then(res => setUser(res.data))
        .catch(() => setUser(null));
    }, []);
    return (
        <AuthContext.Provider value={{ user, setUser }}>
        {children}
        </AuthContext.Provider>
    );
}
