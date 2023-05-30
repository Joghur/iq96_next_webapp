'use client';

import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

import LoadingSpinner from '@components/utility/LoadingSpinner';
import PageLayout from '@components/layout/PageLayout';
import { authContext } from '@lib/store/auth-context';
import { DocumentUser, useFirestoreMax4Days } from '@lib/hooks/useFirestore';
import { User } from 'firebase/auth';
import { convertEpochSecondsToDateString } from '@lib/dates';
import moment from 'moment';
import Image from 'next/image';

type FirebaseTimestamp = {
  seconds: number;
};

interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
}

export interface ChatType {
  createdAt: Date | FirebaseTimestamp;
  group: string;
  text: string;
  user: ChatUser;
}

interface Props {
  authUser: User | null;
  documentUser: DocumentUser | null;
}

const ChatPage = () => {
  const [days, setDays] = useState(4);
  const [input, setInput] = useState<string>('');
  const { authUser, documentUser, loading } = useContext(authContext);
  const {
    docs: chats,
    loading: chatLoading,
    addingDoc,
  } = useFirestoreMax4Days('chats', 'createdAt', days);

  const router = useRouter();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!authUser) {
    router.replace('/');
  }

  if (chatLoading) {
    return <LoadingSpinner text={'Henter Chats'} />;
  }

  const handleChangeDays = (days = 10) => {
    setDays(old => old + days);
  };

  const handleSubmit = () => {
    if (input.trim() !== '') {
      addingDoc({
        createdAt: new Date(),
        group: 'general',
        text: input.trim(),
        user: {
          id: authUser?.uid,
          name: documentUser?.nick || 'Ukendt',
          avatar: documentUser?.avatar,
        },
      });
      setInput(() => '');
    }
  };

  let dayAsMilliSeconds = 0;
  let showDay = true;

  return (
    <PageLayout>
      <div className="mx-auto max-w-4xl min-h-screen mt-12 sm:mt-40">
        <div className="flex flex-row justify-center gap-2">
          <button
            onClick={() => handleChangeDays()}
            className="btn dynamic_text">
            Vis beskeder for 10 dage tilbage
          </button>
          <button
            onClick={() => handleChangeDays(365)}
            className="btn dynamic_text">
            Gå et år tilbage
          </button>
        </div>
        <div className="p-4">
          {chats.length > 0 &&
            chats.map((chat, index) => {
              const isChatUser = chat.user.name === documentUser?.nick;

              const isSame = moment(chat.createdAt.seconds * 1000).isSame(
                moment(dayAsMilliSeconds),
                'date',
              );

              if (!isSame) {
                showDay = true;
              } else {
                showDay = false;
              }
              dayAsMilliSeconds = chat.createdAt.seconds * 1000;

              return (
                <div className={`mb-4`}>
                  <ul className={` ${isChatUser ? '' : ''}`}>
                    {showDay && (
                      <li>
                        <div className="flex items-center justify-center inline-block mb-4 bg-gray-200 text-gray-700 ring-1 rounded-full">
                          <span className="dynamic_text">
                            {convertEpochSecondsToDateString(
                              chat.createdAt.seconds,
                              'D/MMM-YYYY',
                            )}
                          </span>
                        </div>
                      </li>
                    )}
                    <div
                      className={`flex flex-col ${
                        isChatUser ? 'items-end' : 'items-start'
                      }`}>
                      <div
                        className={`max-w-xs p-2 shadow-lg rounded-lg ${
                          isChatUser ? 'bg-lime-500' : 'bg-orange-500'
                        }`}>
                        <li key={index}>
                          <div className="flex">
                            <div className="flex flex-none flex-col justify-center items-center mr-1">
                              <Image
                                width={27}
                                height={27}
                                alt={chat.user.name}
                                src={`/images/avatars/${chat.user?.avatar}.png`}
                                className="rounded-full bg-gray-300 ring-1 ring-gray-500"
                              />
                              <p className="mt-1 text-gray-500 dynamic_text">
                                {convertEpochSecondsToDateString(
                                  chat.createdAt.seconds,
                                  'HH:mm',
                                )}
                              </p>
                            </div>
                            <div className={``}>
                              <div
                                className={`flex flex-row justify-between p-1`}>
                                <p
                                  className={`dark:text-gray-900 dynamic_text`}>
                                  <strong>
                                    {isChatUser ? 'Dig' : chat.user.name}
                                  </strong>
                                </p>
                              </div>
                              <p className="p-1 dark:text-gray-900 dynamic_text">
                                {chat.text}
                              </p>
                            </div>
                          </div>
                        </li>
                      </div>
                    </div>
                  </ul>
                </div>
              );
            })}
          {chats.length === 0 && (
            <div className="box">
              <p className="p-2">
                Der er ingen chats indenfor de sidste par dage. Prøv at trykke
                på de to knapper ovenover
              </p>
            </div>
          )}
          <div className="flex items-center space-x-2 mt-4">
            <input
              type="text"
              value={input}
              className="flex-grow px-4 py-2 bg-white border border-gray-300 rounded-full"
              placeholder="Skriv en besked"
              onChange={event => setInput(event.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center w-10 h-10 text-white bg-green-500 rounded-full">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ChatPage;
