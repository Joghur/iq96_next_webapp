'use client';

import { ChangeEvent, useState } from 'react';
import { DayEvent, EventType } from './EventsPage';
import { confirmAction } from '@lib/utils';
import DayEventsForm from './DayEventForm';
import { Button } from '@components/ui/button';
import CloseButton from '@components/buttons/CloseButton';
import { CopyButton } from '@components/buttons/CopyButton';
import { SimpleDateTimePicker } from '@components/dates/SimpleDateTimePicker';

const initialEvent: EventType = {
  type: 'tour',
  status: 'pending',
  city: 'Kokkedal',
  start: { date: '', time: '' },
  end: { date: '', time: '' },
  year: new Date().getFullYear(),
  dayEvents: [
    {
      dateString: '2025-09-28',
      entries: [
        {
          time: '11:00',
          label: 'Mødes under uret, Hovedbanegården',
          type: 'meetingPoint',
        },
        { time: '12:30', label: 'Hotel', type: 'hotel' },
        { time: '13:30', label: 'Aktivitet', type: 'activity' },
        { time: '14:30', label: 'Guided tour', type: 'guidedTour' },
      ],
    },
    {
      dateString: '2025-09-29',
      entries: [
        { time: '16:30', label: 'GF mødestart', type: 'meeting' },
        { time: '19:30', label: 'Cantinos & Centerpubben', type: 'bar' },
      ],
    },
  ],
};

interface Props {
  event?: EventType;
  editable?: boolean;
  onClose: () => void;
  onUpdate: (id: string, document: EventType) => Promise<void>;
  onAdding: (document: EventType) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const EventForm = ({
  event,
  onClose,
  editable = true,
  onUpdate,
  onAdding,
  onDelete,
}: Props) => {
  const [changedEvent, setChangingEvent] = useState<EventType>(
    event || initialEvent
  );

  const isNew = !event?.id;

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (event) {
      const { id, value } = event.target;

      setChangingEvent((oldEvent) => ({
        ...oldEvent,
        [id]: value,
      }));
    }
  };

  // const handleDateTimeChange = (
  //   property: 'start' | 'end',
  //   dateTime: { date: string; time: string }
  // ) => {
  //   setChangingEvent((oldEvent) => ({
  //     ...oldEvent,
  //     [property]: dateTime,
  //   }));
  // };

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;

    setChangingEvent((prevData) => ({
      ...prevData,
      [id]: !prevData[id as keyof EventType],
    }));
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;

    const confirmed = await confirmAction('Er du sikker på, at du vil slette?');
    if (confirmed) {
      await onDelete(id);
      onClose();
    }
  };

  const handleSubmit = async () => {
    if (!editable || !changedEvent) return;

    try {
      if (isNew && onAdding) {
        await onAdding?.(changedEvent);
      } else if (!isNew && changedEvent.id && onUpdate) {
        await onUpdate?.(changedEvent.id, changedEvent);
      }
      onClose();
    } catch (error) {
      console.error('Opdatering fejlede:', error);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 mt-8">
      <div className="fixed top-0 left-0 w-full h-32 p-4 bg-white shadow-md z-50">
        <h3 className="text-lg font-bold">
          <div className="flex flex-row items-center justify-between">
            {isNew ? 'Opret ny begivenhed' : 'Opdatér begivenhed'}
            <CloseButton onClick={onClose} />
          </div>
        </h3>
        <div className="flex justify-between py-10">
          <Button
            onClick={() => handleDelete(event?.id)}
            color={'error'}
            disabled={!event?.id}
            variant="destructive"
            size="sm"
          >
            Slet
          </Button>
          <div className="flex gap-7">
            <Button
              onClick={onClose}
              color={'error'}
              variant="secondary"
              size="sm"
            >
              Fortryd
            </Button>
            <Button variant="default" onClick={handleSubmit} size="sm">
              {isNew ? 'Opret' : 'Opdatér'}
            </Button>
          </div>
        </div>
      </div>
      <div className="pt-24">
        <div className="pt-5">
          <label
            htmlFor="role"
            className="dynamic_text green_gradient mb-2 block font-medium"
          >
            Status:
          </label>
          <select
            id="status"
            value={changedEvent.status}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 dark:border-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option value="done">Færdig</option>
            <option value="next">Næste</option>
            <option value="pending">Senere</option>
          </select>
        </div>
        <div className="pt-5">
          <label
            htmlFor="role"
            className="dynamic_text green_gradient mb-2 block font-medium"
          >
            Event type:
          </label>
          <select
            id="type"
            value={changedEvent.type}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 dark:border-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option value="tour">Tour</option>
            <option value="gf">Generalforsamling</option>
            <option value="oel">ØL</option>
            <option value="golf">Golf</option>
            <option value="other">Andet</option>
          </select>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="showInfoLink"
              className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              checked={changedEvent.showInfoLink}
              onChange={handleToggle}
            />
            <label
              htmlFor="infolink"
              className="dynamic_text ml-2 block text-sm"
            >
              Vis Infolink
            </label>
          </div>{' '}
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="showMapLink"
              className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              checked={changedEvent.showMapLink}
              onChange={handleToggle}
            />
            <label
              htmlFor="maplink"
              className="dynamic_text ml-2 block text-sm"
            >
              Vis MapLink
            </label>
          </div>{' '}
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="showUploadButton"
              className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              checked={changedEvent.showUploadButton}
              onChange={handleToggle}
            />
            <label
              htmlFor="uploadButton"
              className="dynamic_text ml-2 block text-sm"
            >
              Vis Upload Button
            </label>
          </div>
        </div>
        <div className="pt-5">
          <label
            htmlFor="city"
            className="dynamic_text green_gradient mb-2 block font-medium"
          >
            By
          </label>
          <textarea
            id="city"
            value={changedEvent.city}
            onChange={handleChange}
            placeholder={changedEvent?.city || 'By'}
            className="dynamic_text textarea-bordered textarea"
          />
        </div>
        <div className="pt-5">
          <label
            htmlFor="start"
            className="dynamic_text green_gradient mb-2 block font-medium"
          >
            Start dato
          </label>
          <div className="flex flex-col gap-2">
            <SimpleDateTimePicker
              value={changedEvent.start}
              onChange={(value) =>
                setChangingEvent((prev) => ({
                  ...prev,
                  start: value,
                }))
              }
              showPreview
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setChangingEvent((prev) => ({
                    ...prev,
                    start: { ...prev.start, date: '' },
                  }))
                }
              >
                Ryd dato
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setChangingEvent((prev) => ({
                    ...prev,
                    start: { ...prev.start, time: '' },
                  }))
                }
              >
                Ryd tid
              </Button>
            </div>
          </div>
        </div>
        <div className="pt-5">
          <label
            htmlFor="end"
            className="dynamic_text green_gradient mb-2 block font-medium"
          >
            Slut dato
          </label>
          <div className="flex flex-col gap-2">
            <SimpleDateTimePicker
              value={changedEvent.end}
              onChange={(value) =>
                setChangingEvent((prev) => ({
                  ...prev,
                  end: value,
                }))
              }
              showPreview
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setChangingEvent((prev) => ({
                    ...prev,
                    end: { ...prev.end, date: '' },
                  }))
                }
              >
                Ryd dato
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setChangingEvent((prev) => ({
                    ...prev,
                    end: { ...prev.end, time: '' },
                  }))
                }
              >
                Ryd tid
              </Button>
            </div>
          </div>
        </div>
        <div className="pt-5">
          <label
            htmlFor="notes"
            className="dynamic_text green_gradient mb-2 block font-medium"
          >
            OBS!
          </label>
          <textarea
            id="notes"
            value={changedEvent.notes}
            onChange={handleChange}
            placeholder={changedEvent?.notes || 'Slut'}
            className="dynamic_text textarea-bordered textarea"
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="dayEvents"
            className="dynamic_text green_gradient mb-2 block font-medium"
          >
            Aktiviteter
          </label>
          <DayEventsForm
            dayEvents={sortDayEvents(changedEvent.dayEvents)}
            onChange={(updated) => {
              setChangingEvent((oldEvent) => ({
                ...oldEvent,
                dayEvents: sortDayEvents(updated),
              }));
            }}
          />
        </div>
        <div className="pt-5">
          <label
            htmlFor="notesActivities"
            className="dynamic_text green_gradient mb-2 block font-medium"
          >
            OBS. Aktiviteter
          </label>
          <textarea
            id="notesActivities"
            value={changedEvent.notesActivities}
            onChange={handleChange}
            placeholder={changedEvent?.notesActivities || 'OBS! aktiviteter'}
            className="dynamic_text textarea-bordered textarea"
          />
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <div className="dynamic_text">
            Brug &quot;--&quot; til at separere emner
          </div>
          <div className="dynamic_text">
            <CopyButton text="<link:hotel>" />
          </div>
          <div className="dynamic_text">
            <CopyButton text="<link:middag>" />
          </div>
          <div className="dynamic_text">
            <CopyButton text="<link:frokost>" />
          </div>
          <div className="dynamic_text">
            <CopyButton text="<link:tour>" />
          </div>
          <div className="dynamic_text">
            <CopyButton text="<link:gf>" />
          </div>
          <div className="dynamic_text">
            <CopyButton text="<link:extra:Depeche Mode:bar>" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventForm;

export function sortDayEvents(dayEvents: DayEvent[]): DayEvent[] {
  return [...dayEvents]
    .sort((a, b) => a.dateString.localeCompare(b.dateString))
    .map((day) => ({
      ...day,
      entries: [...day.entries].sort((a, b) => a.time.localeCompare(b.time)),
    }));
}
