'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';

import DynamicText from '@components/utility/DynamicText';
import ThemeSelector from '@components/utility/ThemeSelector';
import { authContext } from '@lib/store/auth-context';

const MemberTab = () => {
  const { logout, authUser, documentUser, loading } = useContext(authContext);
  const router = useRouter();

  if (loading) {
    return <h6>Loading...</h6>;
  }

  return (
    <div className="px-5">
      <div className="flex flex-col gap-3">
        <div className="flex-grow">
          <DynamicText>
            <strong>{documentUser?.name}</strong>
          </DynamicText>
          <DynamicText>{documentUser?.nick}</DynamicText>
          {documentUser?.nick !== documentUser?.title && (
            <DynamicText>{documentUser?.title}</DynamicText>
          )}
          <DynamicText>{authUser?.email}</DynamicText>
        </div>
        <ThemeSelector />
        <button
          onClick={() => {
            logout();
            router.replace('/');
          }}
          className="btn btn-error btn-xs">
          Log ud
        </button>
      </div>
    </div>
  );
};

export default MemberTab;
