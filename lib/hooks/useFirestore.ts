/* eslint-disable prettier/prettier */
import { onAuthStateChanged, User } from 'firebase/auth';
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
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
import { useCallback, useEffect, useState } from 'react';

import { MapCityType } from '@components/map/AddCityButton';
import { app, auth, db } from '@lib/firebase';

export interface DocumentUser {
  id: string;
  uid: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
  isBoard: boolean;
  isSuperAdmin: boolean;
  name: string;
  nick: string;
  title: string;
  tshirt?: string;
  address?: string;
  phones?: string[];
  birthday?: string;
}

export type CollectionName =
  | 'users'
  | 'events'
  | 'map'
  | 'chats'
  | 'notification';

/**
 * OBS viser kun fire events
 */
export const useFirestore = <T extends DocumentData>(
  collectionName: CollectionName,
  order: string,
  orderDirection: 'desc' | 'asc' = 'asc',
  limitBy = 4
) => {
  const [docs, setDocs] = useState<T[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const collectionRef = collection(db, collectionName);

  const addingDoc = async (document: T, id?: string) => {
    try {
      if (id) {
        const docRef = doc(db, collectionName, id);
        await setDoc(docRef, {
          ...document,
          id: id,
          start: document.start ?? '', // sikrer at det eksisterer
        });
      } else {
        const docRef = await addDoc(collectionRef, {
          ...document,
        });
        await setDoc(
          docRef,
          { ...document, id: docRef.id, start: document.start ?? '' },
          { merge: true }
        );
      }
    } catch (error) {
      // TODO: proper errorhandling
      console.error('Error adding document:', error);
    }
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
      .catch((error) => {
        console.error(`Error deleting document with ID ${id}: `, error);
      });
  };

  useEffect(() => {
    const queryRef = query(
      collection(db, collectionName) as CollectionReference<T>,
      orderBy(order, orderDirection),
      limit(limitBy)
    ) as Query<T>;
    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      const docs: T[] = [];
      snapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setDocs(() => docs as T[]);
      setLoading(() => false);
    });
    return unsubscribe;
  }, [collectionName, limitBy, order, orderDirection]);

  return { docs, loading, addingDoc, updatingDoc, deletingDoc };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useCityData = <T extends DocumentData>(
  collectionName: CollectionName
) => {
  const [cities, setCities] = useState<string[] | undefined>(undefined);
  const [loadingCities, setLoadingCities] = useState(true);

  const citiesCollectionRef = collection(db, collectionName);

  const addingCities = async (document: MapCityType) => {
    console.log('addingCities');
    try {
      const newDocRef = doc(
        citiesCollectionRef,
        `${document.year}-${document.city}`
      );

      await setDoc(
        newDocRef,
        { city: document.city, year: document.year },
        { merge: true }
      );
    } catch (error) {
      console.log('Error creating city', error);
    }
  };

  const queryCities = useCallback(async () => {
    setLoadingCities(() => true);
    try {
      const q = query(citiesCollectionRef);

      const querySnapshot = await getDocs(q);

      const citiesArr: string[] = [];

      querySnapshot.forEach((doc) => {
        citiesArr.push(doc.id);
      });
      setCities(() => citiesArr);
    } catch (error) {
      console.error('Error querying document IDs:', error);
    }

    setLoadingCities(() => false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    queryCities();
  }, [queryCities]);

  return {
    cities,
    loadingCities,
    addingCities,
  };
};

export const useMapData = <T extends DocumentData>(
  collectionName: CollectionName,
  documentName: string
) => {
  const [markers, setMarkers] = useState<T[] | undefined>(undefined);
  const [loadingMarkers, setLoadingMarkers] = useState(true);

  const queryMarkers = async () => {
    const markersCollectionRef = collection(
      db,
      collectionName,
      documentName,
      'markers'
    ) as CollectionReference<T>;
    setLoadingMarkers(() => true);

    const q = query(markersCollectionRef) as Query<T>;

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs: T[] = [];

      snapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setMarkers(() => docs as T[]);
    });
    setLoadingMarkers(() => false);

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    queryMarkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentName]);

  const addingMarker = async (document: DocumentData) => {
    const markersCollectionRef = collection(
      db,
      collectionName,
      documentName,
      'markers'
    ) as CollectionReference<T>;
    await addDoc(markersCollectionRef, document);
  };

  const updatingMarker = async (id: string, document: DocumentData) => {
    const markersCollectionRef = collection(
      db,
      collectionName,
      documentName,
      'markers'
    ) as CollectionReference<T>;
    const docRef = doc(markersCollectionRef, id);
    await updateDoc(docRef, { ...document });
  };

  const deletingMarker = async (id: string) => {
    const markersCollectionRef = collection(
      db,
      collectionName,
      documentName,
      'markers'
    ) as CollectionReference<T>;
    const docRef = doc(markersCollectionRef, id);
    deleteDoc(docRef)
      .then(() => {
        console.log(`Document with ID ${id} deleted successfully!`);
      })
      .catch((error) => {
        console.error(`Error deleting document with ID ${id}: `, error);
      });
  };
  return {
    markers,
    loadingMarkers,
    addingMarker,
    updatingMarker,
    deletingMarker,
  };
};

/** @deprecated */
export const useFirestoreMax4Days = (
  collectionName: CollectionName,
  order: string,
  days = 4,
  limitBy = 3
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
      .catch((error) => {
        console.error(`Error deleting document with ID ${id}: `, error);
      });
  };

  useEffect(() => {
    const cutoff = Timestamp.fromMillis(
      Date.now() - days * 24 * 60 * 60 * 1000
    );

    // create a Firestore query to fetch documents where createdAt is less than or equal to the cutoff time
    const collectionRef = query(
      collection(db, collectionName),
      where('createdAt', '>=', cutoff),
      orderBy(order),
      limit(limitBy)
    );

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const docs: DocumentData[] = [];
      snapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setDocs(docs);
      setLoading(false);
    });
    return unsubscribe;
  }, [collectionName, days, limitBy, order]);

  return { docs, loading, addingDoc, updatingDoc, deletingDoc };
};

export const useAuth = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setAuthUser(authUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { authUser, loading };
};

export type CopyCollection = 'oldmap' | 'map';

export const copyDocument = async (
  oldCollectionTitle: CopyCollection,
  oldDocumentTitle: string,
  newCollectionTitle = oldCollectionTitle,
  newDocumentTitle = oldDocumentTitle
) => {
  try {
    const oldMapDocRef = doc(db, oldCollectionTitle, oldDocumentTitle);
    const oldMapDocSnapshot = await getDoc(oldMapDocRef);

    if (oldMapDocSnapshot.exists()) {
      const odenseData = oldMapDocSnapshot.data();

      const mapDocRef = doc(db, newCollectionTitle, newDocumentTitle);
      await setDoc(mapDocRef, odenseData);

      console.log(`Document ${newDocumentTitle} copied successfully!`);
    } else {
      console.log(
        `The document does not exist in the collection ${oldCollectionTitle}.`
      );
    }
  } catch (error) {
    console.error(`Error copying document ${oldDocumentTitle}:`, error);
  }
};

// Used to copy firebase structure: collection-document (array) to
// collection-document-collection-documents (array items copied as documents)
export async function copyDocumentsToNestedCollection() {
  const sourceDocRef = doc(db, 'oldmap', 'odense');
  const sourceDocSnap = await getDoc(sourceDocRef);

  if (sourceDocSnap.exists()) {
    const documents = sourceDocSnap.data()?.documents;

    if (documents && Array.isArray(documents)) {
      for (const item of documents) {
        console.log('item', item);
        try {
          await addDoc(collection(db, 'map', '2022-Odense', 'markers'), item);
          await setDoc(
            doc(db, 'map', '2022-Odense'),
            { city: 'Odense', year: '2022' },
            { merge: true }
          );
        } catch (error) {
          console.log('Error creating bookmark', error);
        }
      }

      console.log('Documents copied successfully!');
    } else {
      console.log(
        'The "documents" property does not exist or is not an array.'
      );
    }
  } else {
    console.log('The source document does not exist.');
  }
}

export const deleteMapMarkers = () => {
  getDocs(collection(db, 'map'))
    .then((querySnapshot) => {
      querySnapshot.forEach((document) => {
        const docRef = doc(db, 'map', document.id);

        deleteDoc(docRef)
          .then(() => {
            console.log(
              `Document with ID ${document.id} deleted successfully!`
            );
          })
          .catch((error) => {
            console.error(
              `Error deleting document with ID ${document.id}: `,
              error
            );
          });
      });
    })
    .catch((error) => {
      console.error('Error getting documents: ', error);
    });
};

export const useDocumentUser = (): [
  User | null,
  DocumentUser | null,
  boolean,
  (id: string, document: DocumentData) => Promise<void>,
] => {
  const [authUser, setFirebaseUser] = useState<User | null>(null);
  const [documentUser, setDocumentUser] = useState<DocumentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);
  const { authUser: _authUser, loading: _loading } = useAuth();

  const updatingDoc = async (id: string, document: DocumentData) => {
    const userCollectionRef = collection(db, 'users');
    const docRef = doc(userCollectionRef, id);
    await updateDoc(docRef, { ...document });
  };

  useEffect(() => {
    if (!_loading && _authUser) {
      setFirebaseUser(() => _authUser);
      const userCollectionRef = collection(db, 'users');
      const q = query(userCollectionRef, where('uid', '==', _authUser.uid));
      getDocs(q)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const docData = querySnapshot.docs[0].data() as DocumentUser;
            setDocumentUser(() => ({
              ...docData,
              id: querySnapshot.docs[0].id,
            }));
            setLoading(() => false);
          }
        })
        .catch((error) => {
          console.error('Error getting document user:', error);
        });
    } else {
      setFirebaseUser(() => null);
      setDocumentUser(() => null);
      setLoading(() => false);
    }
    return () => {
      setLoading(() => false);
      setFirebaseUser(() => null);
      setDocumentUser(() => null);
    };
  }, [db, _authUser, _loading]);

  return [authUser, documentUser, loading, updatingDoc];
};

export const checkDoc = async (collectionName: string, documentId: string) => {
  const docRef = doc(db, collectionName, documentId);

  try {
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
};
