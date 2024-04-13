import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user data from SecureStore on component mount
  useEffect(() => {
    loadUserData();
  }, []);

  // Function to load user data from SecureStore
  const loadUserData = async () => {
    try {
      const userData = await SecureStore.getItemAsync('userData');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  // login function
  const login = async (userData) => {
    setUser(userData);
    try {
      await SecureStore.setItemAsync('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };

  // logout function
  const logout = async () => {
    setUser(null);
    try {
      await SecureStore.deleteItemAsync('userData');
    } catch (error) {
      console.error('Error deleting user data:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the context
export const useAuth = () => useContext(AuthContext);
