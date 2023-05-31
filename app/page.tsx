'use client';

import { useContext, useEffect, useState } from 'react';

import EventsPage from '@components/home/EventsPage';
import PageLayout from '@components/layout/PageLayout';
import LoadingSpinner from '@components/utility/LoadingSpinner';
import SignIn from '@components/auth/SignIn';
import { Themes, LOCALSTORAGE_THEME } from '@components/utility/ThemeSelector';
import { authContext } from '@/lib/store/auth-context';
import {
  LOCALSTORAGE_PREFIX,
  getLocalStorage,
  setLocalStorage,
} from '@lib/localStorage';
import CookieWarning from '@components/layout/CookieWarning';

const COOKIE_LOCALSTORAGE_ACCEPTED = `${LOCALSTORAGE_PREFIX}-cookieAccepted`;

export default function Home() {
  const { authUser, documentUser, loading } = useContext(authContext);
  const [isCookieAccepted, setIsCookieAccepted] = useState<string | null>(
    'true',
  );

  const handleStart = () => {
    setIsCookieAccepted(() =>
      getLocalStorage<string>(COOKIE_LOCALSTORAGE_ACCEPTED),
    );

    const savedTheme: Themes | null = getLocalStorage(LOCALSTORAGE_THEME);
    if (savedTheme) {
      document.querySelector('html')?.setAttribute('data-theme', savedTheme);
    }
  };

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
      <EventsPage documentUser={documentUser} />
    </PageLayout>
  );
}
