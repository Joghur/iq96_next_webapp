'use client';

import { useState } from 'react';

import {
  LOCALSTORAGE_PREFIX,
  getLocalStorage,
  setLocalStorage,
} from '@lib/localStorage';

const COOKIE_LOCALSTORAGE_ACCEPTED = `${LOCALSTORAGE_PREFIX}-cookieAccepted`;

const CookieWarning = () => {
  const [isAccepted, setIsAccepted] = useState(false);

  const acceptCookies = () => {
    setLocalStorage<string>(COOKIE_LOCALSTORAGE_ACCEPTED, 'true');
    setIsAccepted(true);
  };

  const isCookieAccepted = getLocalStorage<string>(
    COOKIE_LOCALSTORAGE_ACCEPTED,
  );

  if (isAccepted || isCookieAccepted) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm text-center dynamic_text">
        <div className="flex gap-2 justify-center mb-4">
          <p className="">
            Ved at bruge siden accepterer du brugen af cookies!
          </p>
        </div>
        <button className="btn dynamic_text" onClick={acceptCookies}>
          Acceptér
        </button>
      </div>
    </div>
  );
};

export default CookieWarning;
