'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { readStorage, writeStorage } from '@/lib/storage';

const AUTH_KEY = 'buynest.user.v2';

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  createdAt: string;
};

type AuthContextValue = {
  user: User | null;
  isReady: boolean;
  login: (email: string, password: string) => { ok: boolean; message?: string };
  signup: (data: { name: string; email: string; password: string }) => { ok: boolean; message?: string };
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setUser(readStorage<User | null>(AUTH_KEY, null));
    setIsReady(true);
  }, []);

  const persist = useCallback((next: User | null) => {
    setUser(next);
    writeStorage(AUTH_KEY, next);
  }, []);

  const login = useCallback(
    (email: string, password: string) => {
      if (!email.includes('@') || password.length < 4) {
        return { ok: false, message: 'Podaj poprawny adres e-mail i hasło (min. 4 znaki).' };
      }
      const name = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
      persist({
        id: 'demo-user',
        name,
        email,
        city: 'Warszawa',
        createdAt: new Date().toISOString(),
      });
      return { ok: true };
    },
    [persist],
  );

  const signup = useCallback(
    ({ name, email, password }: { name: string; email: string; password: string }) => {
      if (name.trim().length < 2) return { ok: false, message: 'Podaj imię i nazwisko.' };
      if (!email.includes('@')) return { ok: false, message: 'Podaj poprawny adres e-mail.' };
      if (password.length < 6) return { ok: false, message: 'Hasło musi mieć co najmniej 6 znaków.' };
      persist({ id: 'demo-user', name, email, createdAt: new Date().toISOString() });
      return { ok: true };
    },
    [persist],
  );

  const logout = useCallback(() => persist(null), [persist]);

  const updateProfile = useCallback(
    (data: Partial<User>) => {
      if (!user) return;
      persist({ ...user, ...data });
    },
    [persist, user],
  );

  const value = useMemo(
    () => ({ user, isReady, login, signup, logout, updateProfile }),
    [user, isReady, login, signup, logout, updateProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth musi być użyty wewnątrz AuthProvider');
  return context;
};
