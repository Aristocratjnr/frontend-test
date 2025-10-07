'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { storage, User } from '../lib/storage';

// Auth Context
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
    case 'UPDATE_USER':
      if (!state.user) return state;
      const updatedUser = { ...state.user, ...action.payload };
      return { ...state, user: updatedUser };
    default:
      return state;
  }
}

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const savedUser = storage.get<User>(storage.keys.USER);
    if (savedUser && savedUser.isAuthenticated) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: savedUser });
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const saveUser = (user: User) => {
    storage.set(storage.keys.USER, user);
  };

  const login = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Demo login - in real app this would validate against backend
    if (email && password) {
      const user: User = {
        id: '1',
        name: 'Admin User',
        email: email,
        role: 'admin',
        isAuthenticated: true,
        lastLogin: new Date(),
      };

      saveUser(user);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } else {
      dispatch({ type: 'SET_ERROR', payload: 'Invalid credentials' });
    }
  };

  const logout = () => {
    storage.remove(storage.keys.USER);
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (updates: Partial<User>) => {
    if (state.user) {
      const updatedUser = { ...state.user, ...updates };
      saveUser(updatedUser);
      dispatch({ type: 'UPDATE_USER', payload: updates });
    }
  };

  const refreshAuth = async () => {
    await loadAuthState();
  };

  return (
    <AuthContext.Provider value={{
      state,
      login,
      logout,
      updateUser,
      refreshAuth,
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
