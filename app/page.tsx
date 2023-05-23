'use client';

import {useContext, useEffect, useState} from 'react';
import {authContext} from '@/lib/store/auth-context';

import SignIn from '@/components/SignIn';
import {getLocalStorage} from '@lib/localStorage';
import {Themes} from '@lib/constants';
import {LOCALSTORAGE_THEME} from '@components/utility/ThemeSelector';

export default function Home() {
  const {user, loading} = useContext(authContext);

  const handleStart = () => {
    const savedTheme: Themes | null = getLocalStorage(LOCALSTORAGE_THEME);
    if (savedTheme) {
      document.querySelector('html')?.setAttribute('data-theme', savedTheme);
    }
  };

  useEffect(() => {
    handleStart();
  }, []);

  if (loading) {
    return <h6>Loading...</h6>;
  }

  if (!user) {
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
