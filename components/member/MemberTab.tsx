'use client';

import {useContext} from 'react';

import {authContext} from '@/lib/store/auth-context';
import {useRouter} from 'next/navigation';
import DynamicText from '@components/utility/DynamicText';

const MemberTab = () => {
  const {logout, user, loading} = useContext(authContext);
  const router = useRouter();

  if (loading) {
    return <h6>Loading...</h6>;
  }

  return (
    <>
      {/* <DynamicText>
        <strong>{documentUser?.name}</strong>
      </DynamicText>
      <DynamicText>{documentUser?.nick}</DynamicText>
      {documentUser?.nick !== documentUser?.title && (
        <DynamicText>{documentUser?.title}</DynamicText>
      )}*/}
      <DynamicText>{user?.email}</DynamicText>
      <button
        onClick={() => {
          logout();
          router.replace('/');
        }}>
        Log ud
      </button>
    </>
  );
};

export default MemberTab;
