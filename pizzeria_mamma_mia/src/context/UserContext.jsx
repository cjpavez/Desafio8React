import { createContext, useState, useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

function UserProvider({ children }) {
  const [usuarioRegistrado, setUsuarioRegistrado] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [email, setEmail] = useState(localStorage.getItem('email') || null);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);

  const handleLogin = async (email, password) => {
    try {
      setError(null);
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en el login');
      }

      const data = await response.json();
      setToken(data.token);
      setEmail(data.email);
      setIsLoggedIn(true);
      setUsuarioRegistrado(data.email);
      
      // Guardar en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsuarioRegistrado(null);
    setToken(null);
    setEmail(null);
    setError(null);
    setProfile(null);
    
    // Limpiar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  const handleRegister = async (email, password) => {
    try {
      setError(null);
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en el registro');
      }

      const data = await response.json();
      // No iniciar sesión automáticamente tras el registro
      // Solo devolvemos la respuesta para que la UI navegue al login
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getProfile = async () => {
    try {
      setError(null);
      if (!token) throw new Error('No token disponible');

      const response = await fetch('http://localhost:5000/api/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al obtener perfil');
      }

      const data = await response.json();
      setProfile(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    if (token) {
      getProfile().catch(() => {
        // Si el token es inválido, cerramos sesión
        handleLogout();
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const value = {
    usuarioRegistrado,
    setUsuarioRegistrado,
    isLoggedIn,
    setIsLoggedIn,
    token,
    setToken,
    email,
    setEmail,
    profile,
    error,
    setError,
    handleLogin,
    handleLogout,
    handleRegister
    ,getProfile
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
