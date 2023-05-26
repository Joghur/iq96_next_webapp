'use client';

import { MouseEvent, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

import { authContext } from '@lib/store/auth-context';
import AboutTab from '@components/member/AboutTab';
import AdminTab from '@components/member/AdminTab';
import MemberTab from '@components/member/MemberTab';
import LoadingSpinner from '@components/utility/LoadingSpinner';

type MemberTabs = 'iq96' | 'about' | 'admin';

const MemberPage = () => {
  const { authUser, loading } = useContext(authContext);
  const [value, setValue] = useState<MemberTabs>('iq96');
  const router = useRouter();

  const isSuperAdmin = true; // documentUser?.isSuperAdmin;

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!authUser) {
    router.replace('/');
  }

  const handleChange = (event: MouseEvent<HTMLButtonElement>) => {
    const { id } = event.target as HTMLButtonElement;
    console.log('id', id);

    setValue(id as MemberTabs);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="py-16 pb-4">
        <div className="tabs tabs-boxed">
          <button
            id="iq96"
            onClick={handleChange}
            className={`tab ${
              value === 'iq96' ? 'tab-active' : ''
            } dynamic_text `}>
            Med-Lem
          </button>
          <button
            id="about"
            onClick={handleChange}
            className={`tab ${
              value === 'about' ? 'tab-active' : ''
            } dynamic_text `}>
            Om
          </button>
          {isSuperAdmin && (
            <button
              id="admin"
              onClick={handleChange}
              className={`tab ${
                value === 'admin' ? 'tab-active' : ''
              } dynamic_text `}>
              Admin
            </button>
          )}
        </div>
      </div>
      <div className="pt-6">
        {value === 'iq96' && <MemberTab />}
        {value === 'about' && <AboutTab />}
        {value === 'admin' && <AdminTab />}
      </div>
    </div>
  );
};

export default MemberPage;
