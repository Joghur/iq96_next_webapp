'use client';

// import { User } from 'firebase/auth';
import { motion } from 'framer-motion';
import moment from 'moment';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';

import { handleStartTheme } from '@components/member/ThemeToggle';
import PageLayout from '@components/ui/PageLayout';
import { eventTransitionVariants } from '@lib/animations';
import { convertEpochSecondsToDateString } from '@lib/dates';
import { useFirestore } from '@lib/hooks/useFirestore';
import { authContext } from '@lib/store/auth-context';
import { cn } from '@lib/utils';
import { setLocalStorage } from '@lib/localStorage';
import {
  BadgeNotification,
  SavingBadgeStatusToLocalStorage,
} from '@components/ui/BottomNav';

type FirebaseTimestamp = {
  seconds: number;
};

interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
}

// TODO fix firebase dates
export interface ChatType {
  // createdAt: FirebaseTimestamp | Date;
  id?: string;
  createdAt: any;
  group: string;
  text: string;
  user: ChatUser;
}

const ChatPage = () => {
  const [limitBy, setLimitBy] = useState(4);
  const [input, setInput] = useState<string>('');
  const [updating, setUpdating] = useState<ChatType | undefined>(undefined);
  const { authUser, documentUser } = useContext(authContext);
  const {
    docs: chats,
    addingDoc,
    updatingDoc,
    deletingDoc,
  } = useFirestore<ChatType>('chats', 'createdAt', 'desc', limitBy);

  useEffect(() => {
    handleStartTheme();
    SavingBadgeStatusToLocalStorage('chat-gen');
  }, []);

  if (!authUser) {
    return null;
  }

  const handleDelete = async (id: string | undefined) => {
    if (id) {
      await deletingDoc(id);
    }
  };

  const handleExpandLimit = (messages = 10) => {
    setLimitBy((old) => old + messages);
  };

  const handleSubmit = async () => {
    if (input.trim() !== '' && authUser) {
      if (updating && updating.id) {
        await updatingDoc(updating.id, {
          ...updating,
          text: input.trim(),
        });
        setUpdating(() => undefined);
      } else {
        await addingDoc({
          createdAt: new Date(),
          group: 'general',
          text: input.trim(),
          user: {
            id: authUser.uid,
            name: documentUser?.nick || 'Ukendt',
            avatar: documentUser?.avatar,
          },
        });
        setInput(() => '');
      }
    }
  };

  let dayAsMilliSeconds = 0;
  let showDay = true;

  // console.log('chats', chats);
  const dato = moment(1694342208 * 1000);
  console.log('todate', dato.toDate());

  return (
    <PageLayout>
      <div className="mx-auto mt-12 min-h-screen max-w-4xl sm:mt-24">
        <div
          className={
            'dynamic_text fixed -top-3 right-3 z-50 mt-4 flex w-5/6 items-center space-x-2 sm:top-6'
          }
        >
          <input
            type="text"
            value={input}
            className="flex-grow rounded-full border border-gray-300 bg-white px-4 py-2"
            placeholder="Skriv en besked"
            onChange={(event) => setInput(event.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </button>
        </div>
        <div className="p-4">
          {chats &&
            chats.length > 0 &&
            chats.map((chat, index) => {
              const isChatUser = chat.user.name === documentUser?.nick;

              const isSame = moment(chat.createdAt?.seconds * 1000).isSame(
                moment(dayAsMilliSeconds),
                'date'
              );

              if (!isSame) {
                showDay = true;
              } else {
                showDay = false;
              }
              dayAsMilliSeconds = chat.createdAt.seconds * 1000;

              const listItemClass = cn({
                'dynamic_text mb-4 flex items-center justify-center rounded-full ring-1':
                  true,
                'mt-4': index === 0,
                'mt-16': index !== 0,
              });

              return (
                <motion.div
                  key={`${index}chatMain`}
                  variants={eventTransitionVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: index * 0.3 + 0.3 }}
                  className={'mb-4'}
                >
                  <ul>
                    {showDay && (
                      <li>
                        <div className={listItemClass}>
                          {convertEpochSecondsToDateString(
                            chat.createdAt.seconds,
                            'D/MMM-YYYY'
                          )}
                        </div>
                      </li>
                    )}
                    <div
                      className={`chat -z-10 ${
                        isChatUser ? 'chat-end ml-20' : 'chat-start mr-20'
                      }`}
                    >
                      <div
                        className={`chat-bubble max-w-md shadow-lg ${
                          isChatUser
                            ? 'chat-bubble-success ml-12'
                            : 'chat-bubble-info mr-12'
                        }`}
                      >
                        <li key={index}>
                          <div className="flex">
                            <div className="mr-1 flex flex-none flex-col items-center justify-center">
                              <Image
                                width={27}
                                height={27}
                                alt={chat.user.name}
                                src={`/images/avatars/${chat.user?.avatar}.png`}
                                className="h-auto w-full rounded-full bg-white ring-1 ring-gray-500"
                              />
                              <p className="dynamic_text mt-1 text-gray-500">
                                {convertEpochSecondsToDateString(
                                  chat.createdAt.seconds,
                                  'HH:mm'
                                )}
                              </p>
                            </div>
                            <div>
                              <div
                                className={'flex flex-row justify-between p-1'}
                              >
                                <p className={'dynamic_text text-gray-500'}>
                                  <strong>
                                    {isChatUser ? 'Dig' : chat.user.name}
                                  </strong>
                                </p>
                                <div className="flex flex-row gap-3">
                                  {(documentUser?.isSuperAdmin ||
                                    documentUser?.nick === chat.user.name) && (
                                    <>
                                      <MdDelete
                                        onClick={() => handleDelete(chat.id)}
                                      />
                                    </>
                                  )}
                                </div>
                              </div>
                              <p className="dynamic_text p-1 text-black">
                                {chat.text}
                              </p>
                            </div>
                          </div>
                        </li>
                      </div>
                    </div>
                  </ul>
                </motion.div>
              );
            })}
          {chats && chats.length === 0 && (
            <div className="box">
              <p className="p-2">
                Der er ingen chats indenfor de sidste par dage. Prøv at trykke
                på de to knapper ovenover
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-row justify-center gap-2">
          <button onClick={() => handleExpandLimit()} className="btn">
            Flere beskeder
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default ChatPage;
