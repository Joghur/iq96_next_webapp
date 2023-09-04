'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useContext, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { MdInfo } from 'react-icons/md';
import { z as zod } from 'zod';
import { authContext } from '@/lib/store/auth-context';
import ThemeToggle from '@components/member/ThemeToggle';
import BottomSpacer from '@components/ui/BottomSpacer';
import OldPageButton from '@components/ui/OldPageButton';
import Tooltip from '@components/ui/Tooltip';
import {
  getLocalStorage,
  LOCALSTORAGE_PREFIX,
  setLocalStorage,
} from '@lib/localStorage';

export const LOCALSTORAGE_EMAIL = `${LOCALSTORAGE_PREFIX}-email`;

function SignIn() {
  const formSchema = zod
    .object({
      email: zod
        .string()
        .email('Dette er ikke en brugbar email adresse')
        .min(1, 'En registreret email adresse er påkrævet'),
      password: zod
        .string()
        .min(1, 'Kodeord er påkrævet')
        .min(8, 'Kodeord skal være på mindst 8 tegn'),
      confirmPassword: zod
        .string()
        .min(1, 'Bekræftelses kodeord er påkrævet')
        .min(8, 'Bekræftelses kodeord skal være på mindst 8 tegn')
        .optional(),
    })
    .refine(
      (data) =>
        reset ? data.password === data.confirmPassword : Boolean(data.password),
      {
        path: ['confirmPassword'],
        message: 'Kodeord skal være ens',
      }
    );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: getLocalStorage(LOCALSTORAGE_EMAIL) || undefined,
    },
  });
  type FormSchemaType = zod.infer<typeof formSchema>;
  const { emailLoginHandler, resetPassword } = useContext(authContext);
  const [reset, setReset] = useState(false);
  const [showResetInfo, setShowResetInfo] = useState(false);

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    if (reset) {
      setReset(() => false);
      await resetPassword(data.email);
    } else {
      await emailLoginHandler(data.email, data.password);
    }
    setLocalStorage(LOCALSTORAGE_EMAIL, data.email);
  };

  return (
    <main className="dynamic_text container mx-auto max-w-2xl px-6">
      <div className="fixed right-4 top-4 z-50 flex flex-row items-center justify-center opacity-100">
        <ThemeToggle />
      </div>
      <p className="blue_gradient mb-3 pt-16 text-center font-bold sm:text-xl">
        Velkommen til IQ96&apos;s webapp
      </p>
      <div className="mb-6 mt-5 flex items-center justify-center gap-2">
        <div>
          <p>Log ind for at fortsætte</p>
        </div>
        <div>
          <p className="font-bold">eller</p>
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
          <form onSubmit={handleSubmit(reset ? onSubmit : onSubmit)}>
            <div className="mb-4 flex flex-col">
              <div className="flex flex-row gap-2 text-center">
                <div className="flex gap-1 text-center">
                  <label
                    htmlFor="email"
                    className="orange_gradient mb-2 font-medium"
                  >
                    Email
                  </label>
                  <Tooltip
                    text={`Email brugt til login på denne side eller android app'en. OBS! Det er ikke nødvendigvis den samme som bruges til den gamle side på ${process.env.NEXT_PUBLIC_OLDPAGE_LINK}`}
                    position="right"
                  >
                    <MdInfo fontSize="large" color={'green'} />
                  </Tooltip>
                </div>
                <div>
                  {errors.email && (
                    <span className="text-red-500">
                      {errors.email?.message}
                    </span>
                  )}
                </div>
              </div>
              <input
                type="email"
                id="email"
                className="w-full rounded border border-gray-300 px-4 py-2"
                placeholder={'Din email'}
                {...register('email')}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="orange_gradient  mb-2 block font-medium"
              >
                Kodeord
              </label>
              <input
                type="password"
                id="password"
                className="w-full rounded border border-gray-300 px-4 py-2"
                {...register('password')}
              />
              {errors.password && (
                <span className="mt-2 block text-red-500">
                  {errors.password?.message}
                </span>
              )}
            </div>
            {reset && (
              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="orange_gradient  mb-2 block font-medium"
                >
                  Bekræft kodeord
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full rounded border border-gray-300 px-4 py-2"
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <span className="mt-2 block text-red-500">
                    {errors.confirmPassword?.message}
                  </span>
                )}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className=" mx-auto mt-6 flex items-center gap-2 rounded-lg bg-gray-700 p-4 font-medium text-white"
            >
              <Image
                src="/images/logo/iqlogo_180.png"
                alt="logo"
                width={37}
                height={37}
              />
              {reset ? 'Reset' : 'Login'}
            </button>
          </form>
        </div>
      </div>
      {!reset && (
        <div className="flex flex-col items-center pl-2 pt-4 text-lg">
          <button
            onClick={async () => {
              setReset(() => true);
              setShowResetInfo(() => true);
            }}
            className="orange_gradient"
          >
            Reset kodeord
          </button>
        </div>
      )}
      {showResetInfo && (
        <div className="flex flex-col items-center gap-2 pt-4">
          <ul className="list-decimal">
            <li>
              <p>Indtast din email ovenover og tryk Reset</p>
            </li>
            <li>
              <p>Gå til din email indboks</p>
            </li>
            <li>
              <p>
                Find reset mailen. Den kommer fra
                noreply@iq96-20418.firebaseapp.com
              </p>
            </li>
            <li>
              <p>
                Tryk på linket i mail -{'>'} vælg nyt kodeord -{'>'} kom tilbage
                hertil, og tast nyt kodeord ind
              </p>
            </li>
          </ul>
        </div>
      )}
      <BottomSpacer />
    </main>
  );
}

export default SignIn;
