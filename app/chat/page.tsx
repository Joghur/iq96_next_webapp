'use client';

import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import HeaderTitle from '@components/layout/HeaderTitle';
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
      <HeaderTitle title={'Chat'} />
      <div className="justify-center items-center mt-40">
        <p className="text-center">Kommer snart ...</p>
      </div>
    </PageLayout>
  );
};

export default ChatPage;
