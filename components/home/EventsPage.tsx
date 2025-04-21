import { motion } from 'framer-motion';
import { useState } from 'react';
import { MdOutlineHotel } from 'react-icons/md';

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
import TourCard from './TourCard';

export type Type = 'tour' | 'gf' | 'oel' | 'golf' | 'other' | '';
export type EventStatus = 'done' | 'next' | 'pending';
type DayEventType = 'meetingPoint' | 'action' | 'dinner' | 'guidedTour';

export type DayEventElement = {
  time: string;
  label: string;
  type: DayEventType;
};

export type DayEvent = {
  dateString: string;
  entries: DayEventElement[];
};

export type EventType = {
  id?: string;
  city: string;
  end: string;
  start: string;
  type: Type;
  year: number;
  dayEvents: DayEvent[];
  notes?: string;
  notesActivities?: string;
  status?: EventStatus;
  showUploadButton?: boolean;
  showInfoLink?: boolean;
  showMapLink?: boolean;
};

/**
 const data: TourCardData = {
  id: "p5wqqaPR5SRHDRtDb3AP",
  title: "Generalforsamling",
  start: "Lørdag, 27/sep-2025, 16:30",
  end: "Søndag, 29/sep-2025, 13:10",
  dayEvents: [
    {
      date: "2025-09-28",
      entries: [
        { time: "12:00", label: "Middag", type: "activity" },
        { time: "12:30", label: "Hotel", type: "meeting" },
        { time: "18:00", label: "Middag", type: "meeting" },
      ],
    },
    {
      date: "2025-09-29",
      entries: [
        { time: "11:00", label: "Hotel", type: "meeting" },
        { time: "11:30", label: "Guidet rundtur", type: "activity" },
      ],
    },
  ],
  city: "Nyborg",
  status: "done",
};
 */

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
    deletingDoc,
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

  const handleUpdate = async (id: string | undefined) => {
    if (!id) {
      return;
    }
    console.log('events -------------', events);
    setCurrentEvent(
      () => events?.filter((o) => o.id === id)[0] as unknown as EventType
    );
    setShowDialog(() => true);
  };

  const handleClose = () => {
    setShowDialog(false);
    setCurrentEvent(null);
  };

  const canEdit =
    documentUser?.isAdmin ||
    documentUser?.isBoard ||
    documentUser?.isSuperAdmin;

  const previousEvents = events.filter((event) => event.status === 'done');
  const nextEvents = events.filter((event) => event.status === 'next');
  const futureEvents = events.filter((event) => event.status === 'pending');

  console.log('previousEvents', previousEvents);
  console.log('nextEvents', nextEvents);
  console.log('futureEvents', futureEvents);

  //TODO refactor this
  return (
    <div className="dynamic_text">
      <div className="mx-auto max-w-2xl sm:mt-40">
        {previousEvents.length > 0 && (
          <div className="mb-4 mt-16 items-center justify-center">
            <p className="text-center text-[larger] font-bold">Tidligere</p>
          </div>
        )}
        {previousEvents.map((previousEvent, index) => {
          return (
            <div key={index} className="mx-10 my-3 gap-2">
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
                    {previousEvent?.type === 'tour'
                      ? `${handleType(previousEvent?.type)} de ${previousEvent.city}`
                      : handleType(previousEvent?.type)}
                  </p>
                  <div className="flex justify-evenly">
                    {previousEvent.showUploadButton &&
                      previousEvent?.type === 'tour' &&
                      previousEvent?.year &&
                      previousEvent?.city && (
                        <Link
                          href={`/bibliothek/galleri/tour/${previousEvent.year}-${previousEvent.city.toLocaleLowerCase()}`}
                          prefetch={false}
                          className="whitespace-nowrap"
                        >
                          <EventInfoBadge>
                            <ImageIcon className="mr-1" />
                            Upload
                          </EventInfoBadge>
                        </Link>
                      )}
                    {previousEvent.showUploadButton &&
                      previousEvent?.type === 'gf' &&
                      previousEvent?.year && (
                        <Link
                          href={`/bibliothek/galleri/gf/${previousEvent.year}`}
                          prefetch={false}
                          className="whitespace-nowrap"
                        >
                          <EventInfoBadge>
                            <ImageIcon className="mr-1" />
                            Upload
                          </EventInfoBadge>
                        </Link>
                      )}
                    {previousEvent.showUploadButton &&
                      previousEvent?.type === 'oel' &&
                      previousEvent?.year && (
                        <Link
                          href={`/bibliothek/galleri/events/${previousEvent.year}-øl`}
                          prefetch={false}
                          className="whitespace-nowrap"
                        >
                          <EventInfoBadge>
                            <ImageIcon className="mr-1" />
                            Upload
                          </EventInfoBadge>
                        </Link>
                      )}
                    {previousEvent.showUploadButton &&
                      previousEvent?.type === 'golf' &&
                      previousEvent?.year && (
                        <Link
                          href={`/bibliothek/galleri/events/${previousEvent.year}-frisbee`}
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
                  {canEdit && previousEvent.id && (
                    <EditButton
                      onClick={() => handleUpdate(previousEvent.id)}
                    />
                  )}
                </div>
              </motion.div>
            </div>
          );
        })}

        {nextEvents.length > 0 && (
          <div className="mb-4 mt-16 items-center justify-center">
            <p className="text-center text-[larger] font-bold">Næste</p>
          </div>
        )}
        {nextEvents.map((nextEvent, index) => {
          return (
            <div key={index} className="mx-10 my-3 gap-2">
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
                      {nextEvent?.type === 'tour'
                        ? `${handleType(nextEvent?.type)} de ${nextEvent.city}`
                        : handleType(nextEvent?.type)}
                    </p>
                    {canEdit && nextEvent.id && (
                      <EditButton onClick={() => handleUpdate(nextEvent.id)} />
                    )}
                  </div>
                  {!!nextEvent?.start && (
                    <div className="orange_gradient flex text-center text-[larger]">
                      <div>{nextEvent.start}</div>
                    </div>
                  )}
                  {!!nextEvent.end.trim() && (
                    <div className="flex flex-col">
                      <p>Slut:</p>
                      <div className="">
                        <p>{nextEvent.end}</p>
                      </div>
                    </div>
                  )}
                   {nextEvent?.notes && (
                    <div className="flex flex-col">
                      <div className="mt-4">OBS:</div>
                      <div>
                        <EventBulletPoints
                          pointsString={nextEvent.notes.trim()}
                          event={nextEvent}
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex justify-evenly">
                    {nextEvent.showMapLink &&
                      nextEvent.type === 'tour' &&
                      nextEvent?.city && (
                        <Link
                          href={`/kort?aar-by=${nextEvent?.year}-${nextEvent?.city?.trim()}&sted=Vores hotel`}
                          prefetch={false}
                          className="whitespace-nowrap"
                        >
                          <EventInfoBadge>
                            <MdOutlineHotel className="mr-1" />
                            Hotel
                          </EventInfoBadge>
                        </Link>
                      )}
                    {nextEvent.showInfoLink &&
                      nextEvent.showInfoLink &&
                      nextEvent?.year && (
                        <Link
                          href={`/bibliothek/breve/${nextEvent.year}`}
                          prefetch={false}
                          className="whitespace-nowrap"
                        >
                          <EventInfoBadge>
                            <InfoCircledIcon className="mr-1" />
                            Info
                          </EventInfoBadge>
                        </Link>
                      )}
                    {nextEvent.showUploadButton &&
                      nextEvent?.type === 'tour' &&
                      nextEvent?.year &&
                      nextEvent?.city && (
                        <Link
                          href={`/bibliothek/galleri/tour/${nextEvent.year}-${nextEvent.city.toLocaleLowerCase()}`}
                          prefetch={false}
                          className="whitespace-nowrap"
                        >
                          <EventInfoBadge>
                            <ImageIcon className="mr-1" />
                            Upload
                          </EventInfoBadge>
                        </Link>
                      )}
                    {nextEvent.showUploadButton &&
                      nextEvent?.type === 'gf' &&
                      nextEvent?.year && (
                        <Link
                          href={`/bibliothek/galleri/gf/${nextEvent.year}`}
                          prefetch={false}
                          className="whitespace-nowrap"
                        >
                          <EventInfoBadge>
                            <ImageIcon className="mr-1" />
                            Upload
                          </EventInfoBadge>
                        </Link>
                      )}
                    {nextEvent.showUploadButton &&
                      nextEvent?.type === 'oel' &&
                      nextEvent?.year && (
                        <Link
                          href={`/bibliothek/galleri/events/${nextEvent.year}-øl`}
                          prefetch={false}
                          className="whitespace-nowrap"
                        >
                          <EventInfoBadge>
                            <ImageIcon className="mr-1" />
                            Upload
                          </EventInfoBadge>
                        </Link>
                      )}
                    {nextEvent.showUploadButton &&
                      nextEvent?.type === 'golf' &&
                      nextEvent?.year && (
                        <Link
                          href={`/bibliothek/galleri/events/${nextEvent.year}-frisbee`}
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
                  <TourCard data={nextEvent} />
                </div>
              </motion.div>
            </div>
          );
        })}

        {futureEvents.length > 0 && (
          <div className="mb-4 pt-6 sm:pt-16">
            <p className="text-center text-[larger] font-bold">Fremtidig</p>
          </div>
        )}
        {futureEvents.map((futureEvent, index) => {
          return (
            <div key={index} className="mx-10 my-3 gap-2">
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
                      {futureEvent?.type === 'tour'
                        ? `${handleType(futureEvent?.type)} de ${futureEvent.city}`
                        : handleType(futureEvent?.type)}
                    </p>
                    <p>{futureEvent.start}</p>
                    {canEdit && futureEvent.id && (
                      <EditButton
                        onClick={() => handleUpdate(futureEvent.id)}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
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
              <AddButton onClick={() => setShowDialog(true)} />
            </div>
          </motion.div>
        )}
      </div>
      {showDialog && (
        <EventForm
          event={currentEvent || undefined}
          open={showDialog}
          onClose={handleClose}
          onUpdate={updatingDoc}
          onAdding={addingDoc}
          onDelete={deletingDoc}
        />
      )}
    </div>
  );
};

export default EventsPage;
