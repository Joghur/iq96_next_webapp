'use client';

import {ReactNode, createContext} from 'react';
import {
  User,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  DocumentData,
  doc,
  collection,
  query,
  where,
} from 'firebase/firestore';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useDocument, useDocumentOnce} from 'react-firebase-hooks/firestore';

import {app, auth, db} from '@/lib/firebase';
import {useDocumentUser} from '@lib/hooks/useFirestore';

export interface DocumentUser {
  id: string;
  uid: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
  isBoard: boolean;
  isSuperAdmin: boolean;
  locationId: string;
  name: string;
  nick: string;
  title: string;
}

interface AuthContextValues {
  authUser: User | null | undefined;
  documentUser: DocumentUser | DocumentData | null | undefined;
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
  // const [authUser, loading, error] = useAuthState(auth);

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
