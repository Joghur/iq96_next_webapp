import { motion } from 'framer-motion';
import { useState } from 'react';

import { eventTransitionVariants } from '@lib/animations';
import { DocumentUser, useFirestore } from '@lib/hooks/useFirestore';

import EventForm from './EventForm';
import { useTheme } from '@features/member/ThemeToggle';
import PreviousEvents from './events/PreviousEvents';
import NextEvents from './events/NextEvents';
import FutureEvents from './events/FutureEvents';
import LoadingSpinner from '@components/LoadingSpinner';
import AddButton from '@components/buttons/AddButton';

export type Type = 'tour' | 'gf' | 'oel' | 'golf' | 'other' | '';
export type EventStatus = 'done' | 'next' | 'pending';
export type DayEventType =
  | 'meetingPoint'
  | 'activity'
  | 'restaurant'
  | 'bar'
  | 'guidedTour'
  | 'meeting'
  | 'hotel';

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
  const [showDialog, setShowDialog] = useState<'events' | 'event-form'>(
    'events'
  );

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
    console.log('handleUpdate events -------------', events);
    if (id) {
      setCurrentEvent(
        () =>
          events?.filter((event) => event.id === id)[0] as unknown as EventType
      );
    } else {
      setCurrentEvent(null); // cleaning up possible older event
    }
    setShowDialog('event-form');
  };

  const handleClose = () => {
    setShowDialog('events');
    setCurrentEvent(null);
  };

  const canEdit =
    documentUser?.isAdmin ??
    documentUser?.isBoard ??
    documentUser?.isSuperAdmin ??
    false;

  const previousEvents = events.filter((event) => event.status === 'done');
  const nextEvents = events.filter((event) => event.status === 'next');
  const futureEvents = events.filter((event) => event.status === 'pending');

  return (
    <div className="dynamic_text mx-auto max-w-2xl sm:mt-40 px-3">
      {showDialog === 'events' && (
        <>
          <PreviousEvents
            previousEvents={previousEvents}
            theme={theme}
            canEdit={canEdit}
            onUpdate={handleUpdate}
          />

          <NextEvents
            nextEvents={nextEvents}
            theme={theme}
            canEdit={canEdit}
            onUpdate={handleUpdate}
          />

          <FutureEvents
            futureEvents={futureEvents}
            theme={theme}
            canEdit={canEdit}
            onUpdate={handleUpdate}
          />

          {canEdit && (
            <motion.div
              variants={eventTransitionVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 3.1 }}
            >
              <div className="flex items-center justify-center mt-10">
                <AddButton onClick={() => handleUpdate(undefined)} />
              </div>
            </motion.div>
          )}
        </>
      )}
      {showDialog === 'event-form' && (
        <EventForm
          event={currentEvent || undefined}
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

[
  {
    "entries": [
      {
        "label": "Middag",
        "type": "meetingPoint",
        "time": "10:30"
      }
    ],
    "dateString": "2025-04-08"
  },
  {
    "dateString": "2025-04-09",
    "entries": [
      {
        "time": "10:10",
        "label": "fdf",
        "type": "meetingPoint"
      }
    ]
  }
]

[
  {
    "entries": [
      {
        "label": "Middag",
        "type": "meetingPoint",
        "time": "10:30"
      }
    ],
    "dateString": "2025-04-08"
  },
  {
    "dateString": "2025-04-09",
    "entries": [
      {
        "time": "10:10",
        "label": "fdf",
        "type": "meetingPoint"
      }
    ]
  }
]

 */
