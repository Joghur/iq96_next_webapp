/* eslint-disable @typescript-eslint/no-empty-function */
'use client';

import { ReactNode, createContext } from 'react';
import {
  User,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { DocumentData } from 'firebase/firestore';

import { auth } from '@/lib/firebase';
import { DocumentUser, useDocumentUser } from '@lib/hooks/useFirestore';

interface AuthContextValues {
  authUser: User | null | undefined;
  documentUser: DocumentUser | null | undefined;
  loading: boolean;
  emailLoginHandler: (
    email: string | undefined,
    password: string | undefined,
  ) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

export const authContext = createContext<AuthContextValues>({
  authUser: null,
  documentUser: null,
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
  const [authUser, documentUser, loading] = useDocumentUser();

  const emailLoginHandler = async (email?: string, password?: string) => {
    if (!email || !password) {
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log('Logout error: ', err);
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
    authUser,
    documentUser,
    loading,
    emailLoginHandler,
    logout,
    resetPassword,
  };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
}

// Whole collection
// const [documentUsers, loadingCol, errorCol] = useCollection(
//   collection(getFirestore(app), 'users'),
//   {
//     snapshotListenOptions: {includeMetadataChanges: true},
//   },
// );
