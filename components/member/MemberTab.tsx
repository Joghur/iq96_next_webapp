'use client';

import {useContext} from 'react';

import {authContext} from '@/lib/store/auth-context';
import {useRouter} from 'next/navigation';
import DynamicText from '@components/utility/DynamicText';
import ThemeSelector from '@components/utility/ThemeSelector';

const MemberTab = () => {
  const {logout, user, loading} = useContext(authContext);
  const router = useRouter();

  if (loading) {
    return <h6>Loading...</h6>;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex-grow">
        {/* <DynamicText>
        <strong>{documentUser?.name}</strong>
      </DynamicText>
      <DynamicText>{documentUser?.nick}</DynamicText>
      {documentUser?.nick !== documentUser?.title && (
        <DynamicText>{documentUser?.title}</DynamicText>
      )}*/}
        <DynamicText>{user?.email}</DynamicText>
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
  );
};

export default MemberTab;
