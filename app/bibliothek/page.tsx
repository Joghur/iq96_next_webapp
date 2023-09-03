'use client';

import { useContext } from 'react';

import LoadingSpinner from '@components/ui/LoadingSpinner';
import PageLayout from '@components/ui/PageLayout';
import { authContext } from '@lib/store/auth-context';

const LibraryPage = () => {
  const { authUser, loading } = useContext(authContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!authUser) {
    return null;
  }

  return (
    <PageLayout>
      <div className="mt-40 flex items-center justify-center">Galleri her</div>
    </PageLayout>
  );
};

export default LibraryPage;
