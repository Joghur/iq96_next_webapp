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

  if (loading) {
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
      setInput('');
    }
  };

  let dayAsMilliSeconds = 0;
  let showDay = true;

  return (
    <PageLayout>
      <div className="flex justify-center items-center mt-40">
        <div className="stack_row gap-2">
          <button onClick={() => handleChangeDays()}>
            Vis beskeder for 10 dage tilbage
          </button>
          <button onClick={() => handleChangeDays(365)}>
            Gå et år tilbage
          </button>
        </div>
        <div className="paper">
          {chats.length > 0 && (
            <ul>
              {chats.map((chat, index) => {
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
                  <>
                    {showDay && (
                      <li>
                        {/* <Chip
                          label={convertEpochSecondsToDateString(
                            chat.createdAt.seconds,
                            'D/MMM-YYYY',
                          )}
                        /> */}
                      </li>
                    )}
                    <li
                      key={index}
                      className={`flex flex-start ${
                        isChatUser ? 'flex-end' : 'flex-start'
                      }`}>
                      <div
                        className={`paper shadow p-2 ${
                          isChatUser ? 'ml-8' : 'ml-2'
                        } ${isChatUser ? 'mr-2' : 'mr-8'} ${
                          isChatUser ? 'bg-lime-500' : 'bg-orange-500'
                        }`}>
                        <div className="stack_row gap-1">
                          {/* <Avatar
                            alt={chat.user.name}
                            src={`${process.env.PUBLIC_URL}/images/avatars/${chat.user?.avatar}.png`}
                          /> */}
                          <div className="stack">
                            <div className="stack_row gap-2 items-center">
                              <p className="dynamic_text">{chat.user.name}</p>
                              <p className="dynamic_text">
                                {convertEpochSecondsToDateString(
                                  chat.createdAt.seconds,
                                  'HH:mm',
                                )}
                              </p>
                            </div>
                            <p className="dynamic_text">{chat.text}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </>
                );
              })}
            </ul>
          )}
          {chats.length === 0 && (
            <div className="box">
              <p className="p-2">
                Der er ingen chats indenfor de sidste par dage. Prøv at trykke
                på de to knapper ovenover
              </p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ChatPage;

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         height: '100%',
//         width: small ? '100vw' : '95vw',
//       }}>
//       <Stack
//         justifyContent="center"
//         alignItems="center"
//         sx={{
//           flexGrow: 1,
//           overflowY: 'auto',
//           padding: '16px',
//         }}>

//       </Stack>
//       <Box sx={{display: 'flex', gap: '16px', padding: '16px'}}>
//         <TextField
//           label="Skriv din besked"
//           variant="outlined"
//           size="small"
//           fullWidth
//           value={input}
//           onChange={event => setInput(event.target.value)}
//         />
//         <Button variant="contained" onClick={handleSubmit}>
//           Send
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// primary={`${
//     message.user.name
//   } - ${convertEpochSecondsToDateString(
//       message.createdAt.seconds,
//       )}`}
// secondary={message.text}
// />
