// 'use client';

// import {ReactNode, createContext, useMemo, useState} from 'react';

// import {db} from '@/lib/firebase';
// import {
//   DocumentData,
//   FirestoreError,
//   collection,
//   getFirestore,
//   query,
//   where,
// } from 'firebase/firestore';
// import {useDocumentOnce} from 'react-firebase-hooks/firestore';

// export interface DocumentUser {
//   id: string;
//   uid: string;
//   email: string;
//   avatar: string;
//   isAdmin: boolean;
//   isBoard: boolean;
//   isSuperAdmin: boolean;
//   locationId: string;
//   name: string;
//   nick: string;
//   title: string;
// }

// interface SiteContextValues {
//   documentUser: any;
//   loading: boolean;
//   error: FirestoreError | undefined;
// }

// export const siteContext = createContext<SiteContextValues>({
//   documentUser: null,
//   loading: false,
//   error: undefined,
// });

// interface SiteContextProviderProps {
//   children: ReactNode;
// }

// export default function SiteContextProvider({
//   children,
// }: SiteContextProviderProps) {
//   // const q = useMemo(() => {
//   //   const usersRef = collection(db, 'users');
//   //   const q2: any = query(
//   //     usersRef,
//   //     where('uid', '==', 'GIltZAo9WOag81fbckBYEIHLX0N2'),
//   //   );
//   //   return q2;
//   // }, []);
//   // const [documentUser, loading, error] = useDocumentOnce(q);

//   const values = {
//     documentUser,
//     loading,
//     error,
//   };

//   return <siteContext.Provider value={values}>{children}</siteContext.Provider>;
// }

// // Whole collection
// // const [documentUsers, loadingCol, errorCol] = useCollection(
// //   collection(getFirestore(app), 'users'),
// //   {
// //     snapshotListenOptions: {includeMetadataChanges: true},
// //   },
// // );
// // const [documentUser, loadingDoc, errorDoc] = useDocument(
// //   doc(getFirestore(app), 'users', 'CFJPqKxQyILeGOH856rJ'),
// //   {
// //     snapshotListenOptions: {includeMetadataChanges: true},
// //   },
// // );
