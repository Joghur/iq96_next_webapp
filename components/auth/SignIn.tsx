"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import { MdInfo } from "react-icons/md";
import { authContext } from "@/lib/store/auth-context";
import OldPageButton from "@components/ui/OldPageButton";
import Tooltip from "@components/ui/Tooltip";
import {
  getLocalStorage,
  LOCALSTORAGE_PREFIX,
  setLocalStorage,
} from "@lib/localStorage";

export const LOCALSTORAGE_EMAIL = `${LOCALSTORAGE_PREFIX}-email`;

function SignIn() {
  const { emailLoginHandler, resetPassword } = useContext(authContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    setEmail(startEmail || "");
    setPassword("");
  };

  const handleReset = async () => {
    if (validateEmail(email)) {
      setReset(false);
      await resetPassword(email);
    }
  };

  const validateEmail = (mail: string | undefined) => {
    // eslint-disable-next-line no-useless-escape
    if (mail && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      setValidatedEmail({
        validated: true,
        helperText: undefined,
      });
      return true;
    }
    setValidatedEmail({
      validated: false,
      helperText: "Skriv en gyldig email adresse",
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
      helperText: "Kodeord skal være længere end 5 bogstaver",
    });
    return false;
  };

  return (
    <main className="container mx-auto max-w-2xl px-6">
      <p className="blue_gradient dynamic_text mb-3 pt-16 text-center font-bold sm:text-xl">
        Velkommen til IQ96&apos;s webapp
      </p>
      <div className="mb-6 mt-5 flex items-center justify-center gap-2">
        <div>
          <p className="dynamic_text">
            Log ind for at forsætte <span className="font-bold">eller</span>
          </p>
        </div>
        <div>
          <OldPageButton />
        </div>
      </div>
      <div className="flex flex-col overflow-hidden rounded-2xl bg-slate-800 shadow-md shadow-slate-500">
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
          <div className="mb-4 flex flex-col ">
            <div className="flex gap-1 text-center">
              <label
                htmlFor="email"
                className="orange_gradient dynamic_text mb-2 block font-medium"
              >
                Email
              </label>
              <Tooltip
                text={`Email til web app eller android app'en. OBS! Det er ikke nødvendigvis den samme som bruges til den gamle side på ${process.env.NEXT_PUBLIC_OLDPAGE_LINK}`}
                position="right"
              >
                <MdInfo fontSize="large" color={"green"} />
              </Tooltip>
            </div>
            <input
              type="email"
              id="email"
              className="dynamic_text w-full rounded border border-gray-300 px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {!reset && (
            <div className="mb-6">
              <label
                htmlFor="password"
                className="orange_gradient dynamic_text mb-2 block font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="dynamic_text w-full rounded border border-gray-300 px-4 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            className="dynamic_text mx-auto mt-6 flex items-center gap-2 rounded-lg bg-gray-700 p-4 font-medium text-white"
          >
            <Image
              src="/images/logo/iqlogo_180.png"
              alt="logo"
              width={37}
              height={37}
            />
            {reset ? "Reset" : "Login"}
          </button>
        </div>
      </div>
      {!reset && (
        <div className="flex flex-col items-center pl-2 pt-4 text-lg">
          <button
            onClick={async () => {
              setReset(() => true);
              setShowResetInfo(() => true);
            }}
            className="orange_gradient dynamic_text"
          >
            Reset kodeord
          </button>
        </div>
      )}
      {showResetInfo && (
        <div className="flex flex-col items-center gap-2 pt-4">
          <ul className="list-decimal">
            <li>
              <p className="dynamic_text">
                Indtast din email ovenover og tryk Reset
              </p>
            </li>
            <li>
              <p className="dynamic_text">Gå til din email indboks</p>
            </li>
            <li>
              <p className="dynamic_text">
                Find reset mailen. Den kommer fra
                noreply@iq96-20418.firebaseapp.com
              </p>
            </li>
            <li>
              <p className="dynamic_text">
                Tryk på linket i mail -{">"} vælg nyt kodeord -{">"} kom tilbage
                hertil, og tast nyt kodeord ind
              </p>
            </li>
          </ul>
        </div>
      )}
    </main>
  );
}

export default SignIn;
