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
      <main className="container max-w-2xl px-6 pt-10 mx-auto">
        <h3 className="flex flex-col items-center text-gray-600 bold-text text-2xl">
          IQ96
        </h3>
        <h6 className="flex flex-col items-center green_gradient text-xl">
          foreningen for mænd af den rette støbning
        </h6>
      </main>
    </>
  );
}
