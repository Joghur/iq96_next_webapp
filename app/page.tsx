'use client';

import { useContext, useEffect } from 'react';

import LoadingSpinner from '@components/utility/LoadingSpinner';
import EventsPage from '@components/home/EventsPage';
import PageLayout from '@components/layout/PageLayout';
import SignIn from '@components/auth/SignIn';
import { Themes, LOCALSTORAGE_THEME } from '@components/utility/ThemeSelector';
import { authContext } from '@/lib/store/auth-context';
import { getLocalStorage } from '@lib/localStorage';

export default function Home() {
  const { authUser, documentUser, loading } = useContext(authContext);

  const handleStart = () => {
    const savedTheme: Themes | null = getLocalStorage(LOCALSTORAGE_THEME);
    if (savedTheme) {
      document.querySelector('html')?.setAttribute('data-theme', savedTheme);
    }
  };

  useEffect(() => {
    handleStart();
  }, [handleStart]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!authUser) {
    return <SignIn />;
  }

  return (
    <PageLayout title={'Begivenheder'} >
      <EventsPage documentUser={documentUser} />
    </PageLayout>
  );
}
