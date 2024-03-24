import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  MdEdit,
  MdOutlineDining,
  MdOutlineHotel,
  MdOutlineLunchDining,
} from 'react-icons/md';

import LoadingSpinner from '@components/ui/LoadingSpinner';
import { eventTransitionVariants } from '@lib/animations';
import { handleType } from '@lib/convertEventType';
import { DocumentUser, useFirestore } from '@lib/hooks/useFirestore';
import { InfoCircledIcon, ImageIcon } from '@radix-ui/react-icons';

import EventForm from './EventForm';
import Link from 'next/link';
import EventInfoBadge from '@components/ui/EventInfoBadge';

interface FirebaseDate {
  seconds: number;
}

export type EventType = {
  id?: string;
  city: string;
  country: string;
  end: string;
  endDate?: FirebaseDate;
  start: string;
  startDate?: FirebaseDate;
  timezone: string;
  type: string;
  year: number;
  activities?: string;
  meetingPoints: string;
  notes?: string;
  notesActivities?: string;
  hotelLocation?: string;
  restaurantLocation?: string;
  lunchLocation?: string;
  extra1Location?: string;
  extra2Location?: string;
  imagesLink?: string;
  moreInfoLink?: string;
};

interface Props {
  documentUser: DocumentUser | null | undefined;
}

const EventsPage = ({ documentUser }: Props) => {
  const {
    docs: events,
    loading,
    updatingDoc,
  } = useFirestore<EventType>('events', 'startDate');
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

  const handleUpdate = async (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string | undefined
  ) => {
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

  return (
    <div className="dynamic_text">
      <div className="mx-auto max-w-2xl sm:mt-40">
        <div className="mb-4 mt-16 items-center justify-center">
          <p className="text-center text-[larger] font-bold">
            Næste begivenhed
          </p>
        </div>
        {events.map((event, index) => {
          return (
            <div key={index} className="mx-10 my-3 gap-2">
              {index === 0 && (
                <motion.div
                  key={`sd${index}`}
                  initial={{ x: -100 }}
                  animate={{ x: 0 }}
                  transition={{
                    duration: 0.8,
                    type: 'tween',
                  }}
                >
                  <div
                    key={index}
                    className="sm:px-15 paper flex flex-col gap-2 overflow-hidden rounded-xl px-10"
                  >
                    <div className="flex justify-between align-middle">
                      <p className="font-semibold">
                        {event?.type === 'tour'
                          ? `${handleType(event?.type)} de ${event.city}`
                          : handleType(event?.type)}
                      </p>
                      {canEdit && event.id && (
                        <button onClick={(e) => handleUpdate(e, event.id)}>
                          <MdEdit />
                        </button>
                      )}
                    </div>
                    {!!event?.startDate && (
                      <div className="orange_gradient flex text-center text-[larger]">
                        <div>{event.start}</div>
                      </div>
                    )}
                    {!!event?.endDate && (
                      <div className="flex flex-col">
                        <p>Slut:</p>
                        <div className="">
                          <p>{event.end}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex justify-evenly">
                      {event?.hotelLocation && (
                        <Link
                          href={`/kort?aar-by=${event?.hotelLocation?.trim()}&sted=Vores hotel`}
                          prefetch={false}
                          className="whitespace-nowrap"
                        >
                          <EventInfoBadge>
                            <MdOutlineHotel className="mr-1" />
                            Hotel
                          </EventInfoBadge>
                        </Link>
                      )}
                      {event?.restaurantLocation && (
                        <Link
                          href={`/kort?aar-by=${event?.restaurantLocation?.trim()}&sted=Vores middag`}
                          prefetch={false}
                          className="whitespace-nowrap"
                        >
                          <EventInfoBadge>
                            <MdOutlineDining className="mr-1" />
                            Middag
                          </EventInfoBadge>
                        </Link>
                      )}
                      {event?.lunchLocation && (
                        <Link
                          href={`/kort?aar-by=${event?.lunchLocation?.trim()}&sted=Vores frokost`}
                          prefetch={false}
                          className="whitespace-nowrap"
                        >
                          <EventInfoBadge>
                            <MdOutlineLunchDining className="mr-1" />
                            Frokost
                          </EventInfoBadge>
                        </Link>
                      )}
                      {event?.moreInfoLink && (
                        <Link
                          href={
                            event.moreInfoLink.trim().includes('/')
                              ? event.moreInfoLink.trim()
                              : `/bibliothek/breve/${event.moreInfoLink.trim()}`
                          }
                          prefetch={false}
                          className="whitespace-nowrap"
                        >
                          <EventInfoBadge>
                            <InfoCircledIcon className="mr-1" />
                            Info
                          </EventInfoBadge>
                        </Link>
                      )}
                      {event?.imagesLink && (
                        <Link
                          href={`/bibliothek/galleri/${event.imagesLink.trim()}`}
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
                    {event.meetingPoints.trim() && (
                      <div className="flex flex-col">
                        <p className="mt-4">Mødesteder:</p>
                        <div>
                          {event.meetingPoints
                            .split('--')
                            .map((f: string, index) => {
                              return (
                                <div key={index} className="ml-4">
                                  <li>{f.trim()}</li>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}
                    {event?.notes?.trim() && (
                      <div className="flex flex-col">
                        <div className="mt-4">OBS:</div>
                        <div>
                          {event.notes.split('--').map((f: string, index) => {
                            return (
                              <div key={index} className="ml-4">
                                <li>{f.trim()}</li>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {event?.activities?.trim() && (
                      <div className="flex flex-col">
                        <div className="mt-4">Aktiviteter:</div>
                        <div>
                          {event.activities
                            .split('--')
                            .map((f: string, index) => {
                              return (
                                <div key={index} className="ml-4">
                                  <li>{f.trim()}</li>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}
                    {event?.notesActivities?.trim() && (
                      <div className="flex flex-col">
                        <div className="mt-4">OBS:</div>
                        <div>
                          {event.notesActivities
                            .split('--')
                            .map((f: string, index) => {
                              return (
                                <div key={index} className="ml-4">
                                  <li>{f.trim()}</li>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}
                    {event?.extra1Location?.trim() && (
                      <div className="flex flex-col">
                        <div className="mt-4">Extra 1 lokation:</div>
                        <div>
                          {event.extra1Location
                            .split('--')
                            .map((f: string, index) => {
                              return (
                                <div key={index} className="ml-4">
                                  <li>{f.trim()}</li>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}
                    {event?.extra2Location?.trim() && (
                      <div className="flex flex-col">
                        <div className="mt-4">Extra 2 lokation:</div>
                        <div>
                          {event.extra2Location
                            .split('--')
                            .map((f: string, index) => {
                              return (
                                <div key={index} className="ml-4">
                                  <li>{f.trim()}</li>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
              {index === 1 && (
                <div key={`events-${index}`} className="mb-4 pt-6 sm:pt-16">
                  <p className="text-center text-[larger] font-bold">
                    Fremtidige begivenheder
                  </p>
                </div>
              )}
              {index > 0 && (
                <motion.div
                  key={index}
                  variants={eventTransitionVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: index * 0.8 + 0.3 }}
                >
                  <div className="paper overflow-hidden py-2">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold">
                        {event?.type === 'tour'
                          ? `${handleType(event?.type)} de ${event.city}`
                          : handleType(event?.type)}
                      </p>
                      <p>{event.start}</p>
                      {canEdit && event.id && (
                        <button onClick={(e) => handleUpdate(e, event.id)}>
                          <MdEdit />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
      {showDialog && (
        <EventForm
          event={currentEvent || undefined}
          open={showDialog}
          onClose={() => setShowDialog(false)}
          updatingDoc={updatingDoc}
        />
      )}
    </div>
  );
};

export default EventsPage;
