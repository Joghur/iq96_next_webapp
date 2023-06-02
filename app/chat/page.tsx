'use client';

// import { User } from 'firebase/auth';
import { motion } from 'framer-motion';
import moment from 'moment';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { MdDelete } from 'react-icons/md';

import LoadingSpinner from '@components/ui/LoadingSpinner';
import PageLayout from '@components/ui/PageLayout';
import { convertEpochSecondsToDateString } from '@lib/dates';
import { useFirestore } from '@lib/hooks/useFirestore';
import { authContext } from '@lib/store/auth-context';

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

const eventTransitionVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const ChatPage = () => {
  const [limitBy, setLimitBy] = useState(4);
  const [input, setInput] = useState<string>('');
  const [updating, setUpdating] = useState<ChatType | undefined>(undefined);
  const { authUser, documentUser, loading } = useContext(authContext);
  const {
    docs: chats,
    loading: chatLoading,
    addingDoc,
    updatingDoc,
    deletingDoc,
  } = useFirestore<ChatType>('chats', 'createdAt', 'desc', limitBy);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!authUser) {
    return null;
  }

  if (chatLoading) {
    return <LoadingSpinner text={'Henter Chats'} />;
  }

  const handleDelete = async (id: string | undefined) => {
    if (id) {
      await deletingDoc(id);
    }
  };

  const handleExpandLimit = (messages = 10) => {
    setLimitBy(old => old + messages);
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

  return (
    <PageLayout>
      <div className="mx-auto max-w-4xl min-h-screen mt-12 sm:mt-24">
        <div
          className={`fixed -top-3 sm:top-6 right-3 flex w-5/6 items-center space-x-2 mt-4 dynamic_text`}>
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
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
                'date',
              );

              if (!isSame) {
                showDay = true;
              } else {
                showDay = false;
              }
              dayAsMilliSeconds = chat.createdAt.seconds * 1000;

              return (
                <motion.div
                  key={`${index}chatMain`}
                  variants={eventTransitionVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: index * 0.3 + 0.3 }}
                  className={`mb-4`}>
                  <ul className={``}>
                    {showDay && (
                      <li>
                        <div className="flex items-center justify-center mb-4 bg-gray-200 text-gray-700 ring-1 rounded-full">
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
                        isChatUser ? 'items-end ml-7' : 'items-start mr-7'
                      }`}>
                      <div
                        className={`max-w-xs p-2 shadow-lg rounded-lg ${
                          isChatUser
                            ? 'bg-lime-500 ml-12'
                            : 'bg-orange-500 mr-12'
                        }`}>
                        <li key={index}>
                          <div className="flex">
                            <div className="flex flex-none flex-col justify-center items-center mr-1">
                              <Image
                                width={27}
                                height={27}
                                alt={chat.user.name}
                                src={`/images/avatars/${chat.user?.avatar}.png`}
                                className="rounded-full bg-gray-300 ring-1 ring-gray-500 w-full h-auto"
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
                                <p className={`text-gray-500 dynamic_text`}>
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
                              <p className="p-1 text-black dynamic_text">
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
