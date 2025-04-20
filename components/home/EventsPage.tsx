import { motion } from 'framer-motion';
import { useState } from 'react';
import { MdEdit, MdOutlineHotel, MdClose } from 'react-icons/md';

import LoadingSpinner from '@components/ui/LoadingSpinner';
import { eventTransitionVariants } from '@lib/animations';
import { handleType } from '@lib/convertEventType';
import { DocumentUser, useFirestore } from '@lib/hooks/useFirestore';
import { InfoCircledIcon, ImageIcon } from '@radix-ui/react-icons';

import EventForm from './EventForm';
import Link from 'next/link';
import EventInfoBadge from '@components/ui/EventInfoBadge';
import EventBulletPoints from './EventBulletPoints';
import { useTheme } from '@components/member/ThemeToggle';
import AddButton from '@components/ui/buttons/AddButton';
import EditButton from '@components/ui/buttons/EditButton';

type Type = 'tour' | 'gf' | 'oel' | 'golf' | 'other' | '';
export type EventStatus = 'done' | 'next' | 'pending';

export type EventType = {
  id?: string;
  city: string;
  end: string;
  start: string;
  type: Type;
  year: number;
  activities?: string;
  meetingPoints: string;
  notes?: string;
  notesActivities?: string;
  status?: EventStatus;
  showUploadButton?: boolean;
  showInfoLink?: boolean;
  showMapLink?: boolean;
};

interface Props {
  documentUser: DocumentUser | null | undefined;
}

const EventsPage = ({ documentUser }: Props) => {
  const { theme } = useTheme();

  const {
    docs: events,
    loading,
    updatingDoc,
    addingDoc,
  } = useFirestore<EventType>('events', 'start');
  const [currentEvent, setCurrentEvent] = useState<EventType | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  if (loading) {
    return <LoadingSpinner text={'Henter begivenheder...'} />;
  }

  if (!events) {
    return (
      <div className="mx-auto px-6 pt-20 sm:pt-24">
        <p>Der er ingen events på dette tidspunkt</p>
      </div>
    );
  }

  const handleNewEvent = () => {
    setCurrentEvent((old) => ({
      ...old,
      city: 'København',
      start: '',
      end: '',
      year: new Date().getFullYear(),
      activities: '',
      meetingPoints: '',
      type: '',
    }));
    setShowDialog(true);
  };

  const handleUpdate = async (id: string | undefined) => {
    if (!id) {
      return;
    }

    setCurrentEvent(
      () => events?.filter((o) => o.id === id)[0] as unknown as EventType
    );
    setShowDialog(() => true);
  };

  const canEdit =
    documentUser?.isAdmin ||
    documentUser?.isBoard ||
    documentUser?.isSuperAdmin;

  console.log('events', events);

  //TODO refactor this
  return (
    <div className="dynamic_text">
      <div className="mx-auto max-w-2xl sm:mt-40">
        {events.map((event, index) => {
          return (
            <div key={index} className="mx-10 my-3 gap-2">
              {event.status === 'done' && (
                <>
                  <div className="mb-4 mt-16 items-center justify-center">
                    <p className="text-center text-[larger] font-bold">
                      Tidligere
                    </p>
                  </div>
                  <motion.div
                    key={index}
                    variants={eventTransitionVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 1.6 }}
                  >
                    <div
                      key={index}
                      className={`sm:px-15 paper ${theme === 'dark' ? 'bg-gray-800' : 'bg-slate-50'} flex flex-row justify-between overflow-hidden rounded-xl px-10`}
                    >
                      <p className="font-semibold">
                        {event?.type === 'tour'
                          ? `${handleType(event?.type)} de ${event.city}`
                          : handleType(event?.type)}
                      </p>
                      <div className="flex justify-evenly">
                        {event.showUploadButton &&
                          event?.type === 'tour' &&
                          event?.year &&
                          event?.city && (
                            <Link
                              href={`/bibliothek/galleri/tour/${event.year}-${event.city.toLocaleLowerCase()}`}
                              prefetch={false}
                              className="whitespace-nowrap"
                            >
                              <EventInfoBadge>
                                <ImageIcon className="mr-1" />
                                Upload
                              </EventInfoBadge>
                            </Link>
                          )}
                        {event.showUploadButton &&
                          event?.type === 'gf' &&
                          event?.year && (
                            <Link
                              href={`/bibliothek/galleri/gf/${event.year}`}
                              prefetch={false}
                              className="whitespace-nowrap"
                            >
                              <EventInfoBadge>
                                <ImageIcon className="mr-1" />
                                Upload
                              </EventInfoBadge>
                            </Link>
                          )}
                        {event.showUploadButton &&
                          event?.type === 'oel' &&
                          event?.year && (
                            <Link
                              href={`/bibliothek/galleri/events/${event.year}-øl`}
                              prefetch={false}
                              className="whitespace-nowrap"
                            >
                              <EventInfoBadge>
                                <ImageIcon className="mr-1" />
                                Upload
                              </EventInfoBadge>
                            </Link>
                          )}
                        {event.showUploadButton &&
                          event?.type === 'golf' &&
                          event?.year && (
                            <Link
                              href={`/bibliothek/galleri/events/${event.year}-frisbee`}
                              prefetch={false}
                              className="whitespace-nowrap"
                            >
                              <EventInfoBadge>
                                <ImageIcon className="mr-1" />
                                Upload
                              </EventInfoBadge>
                            </Link>
                          )}
                      </div>
                      {canEdit && event.id && (
                        <button
                          onClick={async () => await handleUpdate(event.id)}
                        >
                          <MdEdit />
                        </button>
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          );
        })}
        <div className="mb-4 mt-16 items-center justify-center">
          <p className="text-center text-[larger] font-bold">Næste</p>
        </div>
        {events.map((event, index) => {
          return (
            <div key={index} className="mx-10 my-3 gap-2">
              {event.status === 'next' && (
                <motion.div
                  key={`sd${index}`}
                  initial={{ x: 100 }}
                  animate={{ x: 0 }}
                  transition={{
                    duration: 0.8,
                    type: 'tween',
                  }}
                >
                  <div
                    key={index}
                    className={`sm:px-15 paper ${theme === 'dark' ? 'bg-gray-600' : 'bg-slate-200'} flex flex-col gap-2 overflow-hidden rounded-xl px-10`}
                  >
                    <div className="flex justify-between align-middle">
                      <p className="font-semibold">
                        {event?.type === 'tour'
                          ? `${handleType(event?.type)} de ${event.city}`
                          : handleType(event?.type)}
                      </p>
                      {canEdit && event.id && (
                        <EditButton onClick={() => handleUpdate(event.id)} />
                      )}
                    </div>
                    {!!event?.start && (
                      <div className="orange_gradient flex text-center text-[larger]">
                        <div>{event.start}</div>
                      </div>
                    )}
                    {!!event.end.trim() && (
                      <div className="flex flex-col">
                        <p>Slut:</p>
                        <div className="">
                          <p>{event.end}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex justify-evenly">
                      {event.showMapLink &&
                        event.type === 'tour' &&
                        event?.city && (
                          <Link
                            href={`/kort?aar-by=${event?.year}-${event?.city?.trim()}&sted=Vores hotel`}
                            prefetch={false}
                            className="whitespace-nowrap"
                          >
                            <EventInfoBadge>
                              <MdOutlineHotel className="mr-1" />
                              Hotel
                            </EventInfoBadge>
                          </Link>
                        )}
                      {event.showInfoLink &&
                        event.showInfoLink &&
                        event?.year && (
                          <Link
                            href={`/bibliothek/breve/${event.year}`}
                            prefetch={false}
                            className="whitespace-nowrap"
                          >
                            <EventInfoBadge>
                              <InfoCircledIcon className="mr-1" />
                              Info
                            </EventInfoBadge>
                          </Link>
                        )}
                      {event.showUploadButton &&
                        event?.type === 'tour' &&
                        event?.year &&
                        event?.city && (
                          <Link
                            href={`/bibliothek/galleri/tour/${event.year}-${event.city.toLocaleLowerCase()}`}
                            prefetch={false}
                            className="whitespace-nowrap"
                          >
                            <EventInfoBadge>
                              <ImageIcon className="mr-1" />
                              Upload
                            </EventInfoBadge>
                          </Link>
                        )}
                      {event.showUploadButton &&
                        event?.type === 'gf' &&
                        event?.year && (
                          <Link
                            href={`/bibliothek/galleri/gf/${event.year}`}
                            prefetch={false}
                            className="whitespace-nowrap"
                          >
                            <EventInfoBadge>
                              <ImageIcon className="mr-1" />
                              Upload
                            </EventInfoBadge>
                          </Link>
                        )}
                      {event.showUploadButton &&
                        event?.type === 'oel' &&
                        event?.year && (
                          <Link
                            href={`/bibliothek/galleri/events/${event.year}-øl`}
                            prefetch={false}
                            className="whitespace-nowrap"
                          >
                            <EventInfoBadge>
                              <ImageIcon className="mr-1" />
                              Upload
                            </EventInfoBadge>
                          </Link>
                        )}
                      {event.showUploadButton &&
                        event?.type === 'golf' &&
                        event?.year && (
                          <Link
                            href={`/bibliothek/galleri/events/${event.year}-frisbee`}
                            prefetch={false}
                            className="whitespace-nowrap"
                          >
                            <EventInfoBadge>
                              <ImageIcon className="mr-1" />
                              Upload
                            </EventInfoBadge>
                          </Link>
                        )}
                    </div>
                    {event.meetingPoints && (
                      <div className="flex flex-col">
                        <p className="mt-4">Mødesteder:</p>
                        <div>
                          <EventBulletPoints
                            pointsString={event.meetingPoints.trim()}
                            event={event}
                          />
                        </div>
                      </div>
                    )}
                    {event?.notes && (
                      <div className="flex flex-col">
                        <div className="mt-4">OBS:</div>
                        <div>
                          <EventBulletPoints
                            pointsString={event.notes?.trim()}
                            event={event}
                          />
                        </div>
                      </div>
                    )}
                    {event?.activities && (
                      <div className="flex flex-col">
                        <div className="mt-4">Aktiviteter:</div>
                        <div>
                          <EventBulletPoints
                            pointsString={event.activities.trim()}
                            event={event}
                          />
                        </div>
                      </div>
                    )}
                    {event?.notesActivities && (
                      <div className="flex flex-col">
                        <div className="mt-4">OBS:</div>
                        <div>
                          <EventBulletPoints
                            pointsString={event.notesActivities.trim()}
                            event={event}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
              {event.status === 'pending' && (
                <div key={`events-${index}`} className="mb-4 pt-6 sm:pt-16">
                  <p className="text-center text-[larger] font-bold">
                    Fremtidig
                  </p>
                </div>
              )}
              {event.status === 'pending' && (
                <motion.div
                  key={index}
                  variants={eventTransitionVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: index * 0.8 + 0.3 }}
                >
                  <div
                    className={`sm:px-15 paper ${theme === 'dark' ? 'bg-gray-800' : 'bg-slate-50'} flex flex-col gap-2 overflow-hidden rounded-xl px-10`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold">
                        {event?.type === 'tour'
                          ? `${handleType(event?.type)} de ${event.city}`
                          : handleType(event?.type)}
                      </p>
                      <p>{event.start}</p>
                      {canEdit && event.id && (
                        <EditButton onClick={() => handleUpdate(event.id)} />
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
        {canEdit && (
          <motion.div
            variants={eventTransitionVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <div className="flex items-center justify-center mt-10">
              <AddButton onClick={handleNewEvent} />
            </div>
          </motion.div>
        )}
      </div>
      {showDialog && (
        <EventForm
          event={currentEvent || undefined}
          open={showDialog}
          onClose={() => setShowDialog(false)}
          updatingDoc={updatingDoc}
          addingDoc={addingDoc}
        />
      )}
    </div>
  );
};

export default EventsPage;
