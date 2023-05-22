'use client';

import {useRouter} from 'next/navigation';
import {useContext} from 'react';

import {authContext} from '@lib/store/auth-context';

const LibraryPage = () => {
  const {user, loading} = useContext(authContext);
  const router = useRouter();

  if (loading) {
    return <h6>Loading...</h6>;
  }

  if (!user) {
    router.replace('/');
  }

  return <div className="flex flex-col items-center pt-10">Bibliothek</div>;
};

export default LibraryPage;
