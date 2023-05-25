'use client';

import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import { authContext } from '@lib/store/auth-context';

const ChatPage = () => {
  const { authUser, loading } = useContext(authContext);
  const router = useRouter();

  if (loading) {
    return <h6>Henter...</h6>;
  }

  if (!authUser) {
    router.replace('/');
  }
  return (
    <div className="flex flex-col items-center">
      <div className="py-16">
        <p className="text-5xl">Chat</p>
      </div>
      <p className="">Kommer snart ...</p>
    </div>
  );
};

export default ChatPage;
