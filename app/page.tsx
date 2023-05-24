'use client';

import { useContext, useEffect } from 'react';

import SignIn from '@/components/SignIn';
import { LOCALSTORAGE_THEME, Themes } from '@components/utility/ThemeSelector';
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
    return <h6>Loading...</h6>;
  }

  if (!authUser) {
    return <SignIn />;
  }

  return (
    <>
      <main className="container px-6 pt-10 mx-auto"></main>
    </>
  );
}
