import { onAuthStateChanged, User } from 'firebase/auth';
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  Query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { app, auth, db } from '@lib/firebase';

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

export type CollectionName = 'events' | 'map' | 'chats';

export const useFirestore = <T extends DocumentData>(
  collectionName: CollectionName,
  order: string,
  orderDirection: 'desc' | 'asc' = 'asc',
  limitBy = 4,
) => {
  const [docs, setDocs] = useState<T[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const collectionRef = collection(db, collectionName);

  const addingDoc = async (document: T) => {
    await addDoc(collectionRef, document);
  };

  const updatingDoc = async (id: string, document: T) => {
    const docRef = doc(collectionRef, id);
    await updateDoc(docRef, { ...document });
  };

  const deletingDoc = async (id: string) => {
    const docRef = doc(collectionRef, id);
    deleteDoc(docRef)
      .then(() => {
        console.log(`Document with ID ${id} deleted successfully!`);
      })
      .catch(error => {
        console.error(`Error deleting document with ID ${id}: `, error);
      });
  };

  useEffect(() => {
    const queryRef = query(
      collection(db, collectionName) as CollectionReference<T>,
      orderBy(order, orderDirection),
      limit(limitBy),
    ) as Query<T>;
    const unsubscribe = onSnapshot(queryRef, snapshot => {
      const docs: T[] = [];
      snapshot.forEach(doc => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setDocs(docs as T[]);
      setLoading(false);
    });
    return unsubscribe;
  }, [collectionName, limitBy, order, orderDirection]);

  return { docs, loading, addingDoc, updatingDoc, deletingDoc };
};

/** @deprecated */
export const useFirestoreMax4Days = (
  collectionName: CollectionName,
  order: string,
  days = 4,
  limitBy = 3,
) => {
  const [docs, setDocs] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  const collectionRef = collection(db, collectionName);

  const addingDoc = async (document: DocumentData) => {
    await addDoc(collectionRef, document);
  };

  const updatingDoc = async (id: string, document: DocumentData) => {
    const docRef = doc(collectionRef, id);
    await updateDoc(docRef, { ...document });
  };

  const deletingDoc = async (id: string) => {
    const docRef = doc(collectionRef, id);
    deleteDoc(docRef)
      .then(() => {
        console.log(`Document with ID ${id} deleted successfully!`);
      })
      .catch(error => {
        console.error(`Error deleting document with ID ${id}: `, error);
      });
  };

  useEffect(() => {
    const cutoff = Timestamp.fromMillis(
      Date.now() - days * 24 * 60 * 60 * 1000,
    );

    // create a Firestore query to fetch documents where createdAt is less than or equal to the cutoff time
    const collectionRef = query(
      collection(db, collectionName),
      where('createdAt', '>=', cutoff),
      orderBy(order),
      limit(limitBy),
    );

    const unsubscribe = onSnapshot(collectionRef, snapshot => {
      const docs: DocumentData[] = [];
      snapshot.forEach(doc => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setDocs(docs);
      setLoading(false);
    });
    return unsubscribe;
  }, [db, collectionName, days]);

  return { docs, loading, addingDoc, updatingDoc, deletingDoc };
};

export const useAuth = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authUser => {
      setAuthUser(authUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { authUser, loading };
};

export const copyMapMarkers = () => {
  getDocs(collection(db, 'map'))
    .then(querySnapshot => {
      const documents: DocumentData[] = [];

      querySnapshot.forEach(doc => {
        documents.push(doc.data());
      });

      setDoc(doc(db, 'oldmap', 'odense'), {
        documents: documents,
      })
        .then(() => {
          console.log('Documents copied successfully!');
        })
        .catch(error => {
          console.error('Error copying documents: ', error);
        });
    })
    .catch(error => {
      console.error('Error getting documents: ', error);
    });
};

export const deleteMapMarkers = () => {
  getDocs(collection(db, 'map'))
    .then(querySnapshot => {
      querySnapshot.forEach(document => {
        const docRef = doc(db, 'map', document.id);

        deleteDoc(docRef)
          .then(() => {
            console.log(
              `Document with ID ${document.id} deleted successfully!`,
            );
          })
          .catch(error => {
            console.error(
              `Error deleting document with ID ${document.id}: `,
              error,
            );
          });
      });
    })
    .catch(error => {
      console.error('Error getting documents: ', error);
    });
};

export const useDocumentUser = (): [
  User | null,
  DocumentUser | null,
  boolean,
] => {
  const [authUser, setFirebaseUser] = useState<User | null>(null);
  const [documentUser, setDocumentUser] = useState<DocumentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);
  const { authUser: _authUser, loading: _loading } = useAuth();

  useEffect(() => {
    if (!_loading && _authUser) {
      setFirebaseUser(_authUser);

      const q = query(
        collection(db, 'users'),
        where('uid', '==', _authUser.uid),
      );
      getDocs(q)
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            const docData = querySnapshot.docs[0].data() as DocumentUser;
            setDocumentUser({ ...docData, id: querySnapshot.docs[0].id });
            setLoading(false);
          }
        })
        .catch(error => {
          console.error('Error getting document user:', error);
        });
    } else {
      setFirebaseUser(null);
      setDocumentUser(null);
      setLoading(false);
    }
  }, [db, _authUser, _loading]);

  return [authUser, documentUser, loading];
};
