'use client';

import {MouseEvent, useContext, useState} from 'react';
import {useRouter} from 'next/navigation';

import {authContext} from '@lib/store/auth-context';
import AboutTab from '@components/member/AboutTab';
import AdminTab from '@components/member/AdminTab';
import MemberTab from '@components/member/MemberTab';

type MemberTabs = 'member' | 'about' | 'admin';

const MemberPage = () => {
  const {user, loading} = useContext(authContext);
  const [value, setValue] = useState<MemberTabs>('member');
  const router = useRouter();

  const isSuperAdmin = true; // documentUser?.isSuperAdmin;

  if (loading) {
    return <h6>Loading...</h6>;
  }

  if (!user) {
    router.replace('/');
  }

  const handleChange = (event: MouseEvent<HTMLButtonElement>) => {
    const {id} = event.target as HTMLButtonElement;
    console.log('id', id);

    setValue(id as MemberTabs);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="pt-10 pb-4 mb-4">Med-lems side</h1>
      <div className="tabs tabs-boxed">
        <button
          id="member"
          onClick={handleChange}
          className={`tab ${
            value === 'member' ? 'tab-active' : ''
          }`}>
          Med-Lem
        </button>
        <button
          id="about"
          onClick={handleChange}
          className={`tab ${
            value === 'about' ? 'tab-active' : ''
          }`}>
          Om
        </button>
        {isSuperAdmin && (
          <button
            id="admin"
            onClick={handleChange}
            className={`tab ${value === 'admin' ? 'tab-active' : ''}`}>
            Admin
          </button>
        )}
      </div>
      <div className="pt-6">
        {value === 'member' && <MemberTab />}
        {value === 'about' && <AboutTab />}
        {value === 'admin' && <AdminTab />}
      </div>
    </div>
  );
};

export default MemberPage;
