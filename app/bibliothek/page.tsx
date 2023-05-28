'use client';

import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import HeaderTitle from '@components/layout/HeaderTitleOBSOLETE';
import LoadingSpinner from '@components/utility/LoadingSpinner';
import PageLayout from '@components/layout/PageLayout';
import { authContext } from '@lib/store/auth-context';

const LibraryPage = () => {
  const { authUser, loading } = useContext(authContext);
  const router = useRouter();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!authUser) {
    router.replace('/');
  }

  return (
    <PageLayout title={'Bibliothek'} >
      <div className="flex justify-center items-center mt-40">
        <p className="dynamic_text">Kommer snart ...</p>
      </div>
    </PageLayout>
  );
};

export default LibraryPage;
