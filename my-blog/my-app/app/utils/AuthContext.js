// context/AuthContext.js - Authentication context for state management
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  
  // Check if user is already logged in
  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem('userToken');
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);
      
      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }
      
      setIsLoading(false);
    } catch (e) {
      console.log(`isLoggedIn error ${e}`);
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    isLoggedIn();
  }, []);
  
  const login = async (email, password) => {
    // In a real app, we would validate with a server
    // This is a simple mock for demonstration
    try {
      // Mock validation - in real app, replace with API call
      if (email.toLowerCase() === 'demo@farm.com' && password === 'password') {
        const userData = {
          id: '1',
          email,
          name: 'John Farmer',
          farm: 'Green Valley Farm',
        };
        
        setUserInfo(userData);
        setUserToken('dummy-auth-token');
        
        await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
        await AsyncStorage.setItem('userToken', 'dummy-auth-token');
        
        return { success: true };
      } else {
        return { 
          success: false, 
          message: 'Invalid email or password'
        };
      }
    } catch (e) {
      console.log(`Login error: ${e}`);
      return {
        success: false,
        message: 'Login failed. Please try again.'
      };
    }
  };
  
  const signup = async (name, email, password, farmName) => {
    try {
      // In a real app, you would send this data to your server
      // This is a mock implementation
      const userData = {
        id: Math.floor(Math.random() * 1000).toString(),
        email,
        name,
        farm: farmName
      };
      
      setUserInfo(userData);
      setUserToken('dummy-auth-token');
      
      await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
      await AsyncStorage.setItem('userToken', 'dummy-auth-token');
      
      return { success: true };
    } catch (e) {
      console.log(`Signup error: ${e}`);
      return {
        success: false,
        message: 'Registration failed. Please try again.'
      };
    }
  };
  
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
      await AsyncStorage.removeItem('userToken');
      setUserToken(null);
      setUserInfo(null);
    } catch (e) {
      console.log(`Logout error: ${e}`);
    }
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        isLoading,
        userToken,
        userInfo,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;