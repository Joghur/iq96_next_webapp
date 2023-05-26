'use client';

import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';

import { authContext } from '@/lib/store/auth-context';
import {
  LOCALSTORAGE_PREFIX,
  getLocalStorage,
  setLocalStorage,
} from '@lib/localStorage';
import DynamicText from './utility/DynamicText';

export const LOCALSTORAGE_EMAIL = `${LOCALSTORAGE_PREFIX}-email`;

function SignIn() {
  const { emailLoginHandler, resetPassword } = useContext(authContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reset, setReset] = useState(false);
  const [showResetInfo, setShowResetInfo] = useState(false);

  const [validatedEmail, setValidatedEmail] = useState<{
    validated: boolean;
    helperText: string | undefined;
  }>({
    validated: true,
    helperText: undefined,
  });
  const [validatedPassword, setValidatedPassword] = useState<{
    validated: boolean;
    helperText: string | undefined;
  }>({
    validated: true,
    helperText: undefined,
  });

  useEffect(() => {
    handleStart();
  }, []);

  const handleStart = () => {
    const startEmail: string | null = getLocalStorage(LOCALSTORAGE_EMAIL);

    setEmail(startEmail || '');
    setPassword('');
  };

  const handleReset = async () => {
    if (validateEmail(email)) {
      setReset(false);
      await resetPassword(email);
    }
  };

  const validateEmail = (mail: string | undefined) => {
    if (mail && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      setValidatedEmail({
        validated: true,
        helperText: undefined,
      });
      return true;
    }
    setValidatedEmail({
      validated: false,
      helperText: 'Skriv en gyldig email adresse',
    });
    return false;
  };

  const validatePassword = (password: string | undefined) => {
    if (password && password.length > 5) {
      setValidatedPassword({
        validated: true,
        helperText: undefined,
      });
      return true;
    }
    setValidatedPassword({
      validated: false,
      helperText: 'Kodeord skal være længere end 5 bogstaver',
    });
    return false;
  };

  return (
    <main className="container max-w-2xl px-6 mx-auto">
      <p className="pt-16 mb-3 sm:text-xl blue_gradient font-bold text-center dynamic_text">
        Velkommen til IQ96's webapp
      </p>
      <p className="mb-6 text-center dynamic_text">Log ind for at forsætte</p>

      <div className="flex flex-col overflow-hidden shadow-md shadow-slate-500 bg-slate-800 rounded-2xl">
        <div className="h-42">
          <Image
            src="/images/iq_all_third.jpg"
            alt="iq_all"
            width={650}
            height={100}
            className="text-2xl"
          />
        </div>

        <div className="px-4 py-4">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block orange_gradient font-medium mb-2 dynamic_text">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 rounded px-4 py-2 w-full dynamic_text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          {!reset && (
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block orange_gradient font-medium mb-2 dynamic_text">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border border-gray-300 rounded px-4 py-2 w-full dynamic_text"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button
            onClick={async () => {
              if (reset) {
                await resetPassword(email);
                setReset(() => false);
              } else {
                await emailLoginHandler(email, password);
              }
              setLocalStorage(LOCALSTORAGE_EMAIL, email);
            }}
            className="flex items-center gap-2 p-4 mx-auto mt-6 font-medium text-white bg-gray-700 rounded-lg dynamic_text">
            <Image
              src="/images/logo/iqlogo_180.png"
              alt="logo"
              width={37}
              height={37}
            />
            {reset ? 'Reset' : 'Login'}
          </button>
        </div>
      </div>
      {!reset && (
        <div className="flex flex-col items-center pt-4 pl-2 text-lg">
          <button
            onClick={async () => {
              setReset(() => true);
              setShowResetInfo(() => true);
            }}
            className="orange_gradient dynamic_text">
            Reset kodeord
          </button>
        </div>
      )}
      {showResetInfo && (
        <div className="flex flex-col gap-2 items-center pt-4">
          <ul className="list-decimal">
            <li>
              <DynamicText>
                Indtast din email ovenover og tryk Reset
              </DynamicText>
            </li>
            <li>
              <DynamicText>Gå til din email indboks</DynamicText>
            </li>
            <li>
              <DynamicText>
                Find reset mailen. Den kommer fra
                noreply@iq96-20418.firebaseapp.com
              </DynamicText>
            </li>
            <li>
              <DynamicText>
                Tryk på linket i mail -{'>'} vælg nyt kodeord -{'>'} kom tilbage
                hertil, og tast nyt kodeord ind
              </DynamicText>
            </li>
          </ul>
        </div>
      )}
    </main>
  );
}

export default SignIn;
