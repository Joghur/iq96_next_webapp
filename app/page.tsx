/* eslint-disable prettier/prettier */
'use client';

import { useCallback, useContext, useEffect, useState } from 'react';

import { authContext } from '@/lib/store/auth-context';
import SignIn from '@components/auth/SignIn';
import EventsPage from '@components/home/EventsPage';
import { handleStartTheme } from '@components/member/ThemeToggle';
import CookieWarning from '@components/ui/CookieWarning';
import LoadingSpinner from '@components/ui/LoadingSpinner';
import OldPageButton from '@components/ui/OldPageButton';
import PageLayout from '@components/ui/PageLayout';
import { getLocalStorage, LOCALSTORAGE_PREFIX, setLocalStorage } from '@lib/localStorage';

const COOKIE_LOCALSTORAGE_ACCEPTED = `${LOCALSTORAGE_PREFIX}-cookieAccepted`;

export default function Home() {
  const { authUser, documentUser, loading } = useContext(authContext);
  const [isCookieAccepted, setIsCookieAccepted] = useState<string | null>(
    'true'
  );

  const handleStart = useCallback(() => {
    setIsCookieAccepted(() =>
      getLocalStorage<string>(COOKIE_LOCALSTORAGE_ACCEPTED)
    );
    handleStartTheme();
  }, []);

  useEffect(() => {
    handleStart();
  }, [handleStart]);

  const acceptCookies = () => {
    setLocalStorage<string>(COOKIE_LOCALSTORAGE_ACCEPTED, 'true');
    setIsCookieAccepted('true');
  };

  if (!isCookieAccepted) {
    return <CookieWarning acceptCookies={acceptCookies} />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!authUser) {
    return <SignIn />;
  }

  return (
    <PageLayout>
      <div className="fixed right-0 top-0 sm:right-10 sm:top-10">
        <OldPageButton />
      </div>
      <EventsPage documentUser={documentUser} />
    </PageLayout>
  );
}
