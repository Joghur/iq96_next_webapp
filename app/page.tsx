/* eslint-disable prettier/prettier */
'use client';

import { useCallback, useContext, useEffect, useState } from 'react';

import { authContext } from '@/lib/store/auth-context';
import SignIn from '@features/auth/SignIn';
import EventsPage from '@features/home/EventsPage';
import { handleStartTheme } from '@features/member/ThemeToggle';
import {
  getLocalStorage,
  LOCALSTORAGE_PREFIX,
  setLocalStorage,
} from '@lib/localStorage';
import OldPageButton from '@components/buttons/OldPageButton';
import CookieWarning from '@components/CookieWarning';
import LoadingSpinner from '@components/LoadingSpinner';
import PageLayout from '@components/PageLayout';

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
