'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import DynamicText from '@components/utility/DynamicText';
import { authContext } from '@lib/store/auth-context';
import LoadingSpinner from '@components/utility/LoadingSpinner';
import ThemeSelector from '@components/utility/ThemeSelector';

const MemberTab = () => {
  const { logout, authUser, documentUser, loading } = useContext(authContext);
  const router = useRouter();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="px-5">
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
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => {
            logout();
            router.replace('/');
          }}
          className="btn btn-error btn-xs mt-16">
          Log ud
        </button>
      </div>
    </motion.div>
  );
};

export default MemberTab;
