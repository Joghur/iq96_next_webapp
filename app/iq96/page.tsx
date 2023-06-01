'use client';

import { useRouter } from 'next/navigation';
import { MouseEvent, useContext, useState } from 'react';

import AboutTab from '@components/member/AboutTab';
import AdminTab from '@components/member/AdminTab';
import MemberTab from '@components/member/MemberTab';
import LoadingSpinner from '@components/ui/LoadingSpinner';
import PageLayout from '@components/ui/PageLayout';
import { authContext } from '@lib/store/auth-context';

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
    setValue(id as MemberTabs);
  };

  return (
    <PageLayout>
      <div className="flex justify-end sm:justify-center mb-4 sm:mt-10 sm:mb-15">
        <div className="tabs tabs-boxed inline-block">
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
              } dynamic_text`}>
              Admin
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center pt-6">
        {value === 'iq96' && <MemberTab />}
        {value === 'about' && <AboutTab />}
        {value === 'admin' && <AdminTab />}
      </div>
    </PageLayout>
  );
};

export default MemberPage;
