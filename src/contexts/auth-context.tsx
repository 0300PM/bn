'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_COOKIE_KEY = 'buynest-auth-user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const userFromCookie = Cookies.get(AUTH_COOKIE_KEY);
      if (userFromCookie) {
        setUser(JSON.parse(userFromCookie));
      }
    } catch (error) {
      console.error('Failed to parse auth cookie', error);
      Cookies.remove(AUTH_COOKIE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    Cookies.set(AUTH_COOKIE_KEY, JSON.stringify(userData), { expires: 7 });
  };

  const logout = () => {
    setUser(null);
    Cookies.remove(AUTH_COOKIE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
