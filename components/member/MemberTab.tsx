'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import LoadingSpinner from '@components/ui/LoadingSpinner';
import ThemeSelector from '@components/ui/ThemeSelector';
import { authContext } from '@lib/store/auth-context';

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
          <p className="dynamic_text">
            <strong>{documentUser?.name}</strong>
          </p>
          <p className="dynamic_text">{documentUser?.nick}</p>
          {documentUser?.nick !== documentUser?.title && (
            <p className="dynamic_text">{documentUser?.title}</p>
          )}
          <p>{authUser?.email}</p>
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
