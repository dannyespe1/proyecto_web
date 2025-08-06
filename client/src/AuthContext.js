// src/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Base URL de la API desde variable de entorno
  //const API = process.env.REACT_APP_API_URL|| '';
  // Ejemplo: "https://backend-d7qm.onrender.com"

  // Cargar usuario al iniciar
  useEffect(() => {
    axios.get(
      `/api/auth/me`,
      { withCredentials: true }
    )
    .then(res => setUser(res.data))
    .catch(() => setUser(null));
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

