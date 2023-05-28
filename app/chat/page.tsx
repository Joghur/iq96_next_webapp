'use client';

import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import LoadingSpinner from '@components/utility/LoadingSpinner';
import PageLayout from '@components/layout/PageLayout';
import { authContext } from '@lib/store/auth-context';

const ChatPage = () => {
  const { authUser, loading } = useContext(authContext);
  const router = useRouter();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!authUser) {
    router.replace('/');
  }
  return (
    <PageLayout>
      <div className="flex justify-center items-center mt-40">
        <p className="dynamic_text">Kommer snart ...</p>
      </div>
    </PageLayout>
  );
};

export default ChatPage;
