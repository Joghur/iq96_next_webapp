'use client';

import {ReactNode, createContext} from 'react';
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';

import {auth} from '@/lib/firebase';
import React from 'react';

interface AuthContextValues {
  user: any;
  loading: boolean;
  emailLoginHandler: (
    email: string | undefined,
    password: string | undefined,
  ) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

export const authContext = createContext<AuthContextValues>({
  user: null,
  loading: false,
  emailLoginHandler: async () => {},
  logout: () => {},
  resetPassword: async () => {},
});

interface AuthContextProviderProps {
  children: ReactNode;
}

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [user, loading, error] = useAuthState(auth);

  const emailLoginHandler = async (email?: string, password?: string) => {
    if (!email || !password) {
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log('Logout error: ', error);
      alert('Der er skete en fejl under login!');
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.log('Logout error: ', error);
      alert('Der er skete en fejl under reset kodeord!');
    }
  };

  const values = {
    user,
    loading,
    emailLoginHandler,
    logout,
    resetPassword,
  };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
}
