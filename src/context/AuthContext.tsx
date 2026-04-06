import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { authApi } from '../services/api';

export interface AuthUser {
  id: string;
  username: string;
  role: 'admin' | 'viewer';
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, adminPassword: string, viewerPassword: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // starts true to check stored token

  // On mount: restore session from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('finance_auth_token');
    const storedUser = localStorage.getItem('finance_auth_user');

    if (storedToken && storedUser) {
      try {
        const parsedUser: AuthUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        // Verify token is still valid
        authApi.getMe().catch(() => {
          // Token invalid or expired — clear session
          localStorage.removeItem('finance_auth_token');
          localStorage.removeItem('finance_auth_user');
          setToken(null);
          setUser(null);
        });
      } catch {
        localStorage.removeItem('finance_auth_token');
        localStorage.removeItem('finance_auth_user');
      }
    }

    setIsLoading(false);
  }, []);

  const signIn = useCallback(async (username: string, password: string) => {
    const data = await authApi.signIn(username, password);
    const authUser: AuthUser = data.user;
    const authToken: string = data.token;

    setUser(authUser);
    setToken(authToken);
    localStorage.setItem('finance_auth_token', authToken);
    localStorage.setItem('finance_auth_user', JSON.stringify(authUser));
  }, []);

  const signUp = useCallback(async (username: string, adminPassword: string, viewerPassword: string) => {
    const data = await authApi.signUp(username, adminPassword, viewerPassword);
    const authUser: AuthUser = data.user;
    const authToken: string = data.token;

    setUser(authUser);
    setToken(authToken);
    localStorage.setItem('finance_auth_token', authToken);
    localStorage.setItem('finance_auth_user', JSON.stringify(authUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('finance_auth_token');
    localStorage.removeItem('finance_auth_user');
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      isLoading,
      signIn,
      signUp,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
