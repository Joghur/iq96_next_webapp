'use client';

import { MouseEvent, useContext, useEffect, useState } from 'react';

import AboutTab from '@components/member/AboutTab';
import AdminTab from '@components/member/AdminTab';
import DeveloperTab from '@components/member/DeveloperTab';
import Iq96Tab from '@components/member/Iq96Tab';
import MemberTab from '@components/member/MemberTab';
import MemberTabsPage, { MemberTabs } from '@components/member/MemberTabs';
import { handleStartTheme } from '@components/member/ThemeToggle';
import PageLayout from '@components/ui/PageLayout';
import { authContext } from '@lib/store/auth-context';

const MemberPage = () => {
  const { authUser, documentUser } = useContext(authContext);
  const [value, setValue] = useState<MemberTabs>('member');
  // const [value, setValue] = useState<MemberTabs>('admin');

  useEffect(() => {
    handleStartTheme();
  }, []);

  if (!authUser || !documentUser) {
    return null;
  }

  const handleChange = (event: MouseEvent<HTMLButtonElement>) => {
    const { id } = event.target as HTMLButtonElement;
    setValue(() => id as MemberTabs);
  };

  const isSuperAdmin = documentUser?.isSuperAdmin;
  const isBoard = documentUser?.isBoard;
  const isLocalhost = process.env.NEXT_PUBLIC_ENV !== 'production';
  const isDev = documentUser?.nick === 'Redacteur' && isLocalhost;
  return (
    <PageLayout>
      <MemberTabsPage value={value} onChange={handleChange} />
      <div className="flex items-center justify-center pt-6">
        {value === 'member' && <MemberTab />}
        {value === 'iq96' && <Iq96Tab />}
        {value === 'about' && <AboutTab />}
        {value === 'admin' && (isSuperAdmin || isBoard) && <AdminTab />}
        {value === 'developer' && isDev && <DeveloperTab />}
      </div>
    </PageLayout>
  );
};

export default MemberPage;
