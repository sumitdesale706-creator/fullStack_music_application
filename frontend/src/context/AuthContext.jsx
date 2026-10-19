import React, { createContext, useContext, useState } from 'react';
import { api } from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('spotify_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (credentials) => {
    const data = await api.login(credentials);
    setCurrentUser(data.user);
    localStorage.setItem('spotify_user', JSON.stringify(data.user));
    return data;
  };

  const register = async (userData) => {
    const data = await api.register(userData);
    setCurrentUser(data.user);
    localStorage.setItem('spotify_user', JSON.stringify(data.user));
    return data;
  };

  const logout = async () => {
    try {
      await api.logout();
    } finally {
      setCurrentUser(null);
      localStorage.removeItem('spotify_user');
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);