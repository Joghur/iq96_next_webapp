'use client';

import { ChangeEvent, useState } from 'react';
import { DayEvent, EventType } from './EventsPage';
import Modal from '@components/ui/Modal';
import { CopyButton } from '@components/ui/buttons/CopyButton';
import CloseButton from '@components/ui/buttons/CloseButton';
import { confirmAction } from '@lib/utils';
import DayEventsForm from './DayEventForm';

const initialEvent: EventType = {
  type: 'tour',
  status: 'pending',
  city: 'Kokkedal',
  start: '',
  end: '',
  year: new Date().getFullYear(),
  dayEvents: [
    {
      dateString: '2025-09-28',
      entries: [
        { time: '11:00', label: 'Middag', type: 'meetingPoint' },
        { time: '12:30', label: 'Hotel', type: 'meetingPoint' },
      ],
    },
    {
      dateString: '2025-09-29',
      entries: [
        { time: '11:00', label: 'Hotel', type: 'meetingPoint' },
        { time: '11:30', label: 'Guidet rundtur', type: 'guidedTour' },
      ],
    },
  ],
};

interface Props {
  event?: EventType;
  open: boolean;
  editable?: boolean;
  onClose: () => void;
  onUpdate: (id: string, document: EventType) => Promise<void>;
  onAdding: (document: EventType) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const EventForm = ({
  event,
  open,
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

  const handleDateTimeChange = (
    property: 'start' | 'end',
    dateTime: { date: string; time: string }
  ) => {
    setChangingEvent((oldEvent) => ({
      ...oldEvent,
      [property]: dateTime,
    }));
  };

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

  console.log('changedEvent', changedEvent);

  return (
    <Modal open={open}>
      <h3 className="text-lg font-bold">
        <div className="flex flex-row items-center justify-between">
          {isNew ? 'Opret ny begivenhed' : 'Opdatér begivenhed'}
          <CloseButton onClick={onClose} />
        </div>
      </h3>
      <div>
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
          {/* <DateTimePicker newDate={''} newTime={''} onChangeTime={function (): void {
            throw new Error('Function not implemented.');
          } } onChangeDate={function (): void {
            throw new Error('Function not implemented.');
          } } /> */}
          <textarea
            id="start"
            value={changedEvent.start}
            onChange={handleChange}
            placeholder={changedEvent?.start || 'Start'}
            className="dynamic_text textarea-bordered textarea"
          />
        </div>
        <div className="pt-5">
          <label
            htmlFor="end"
            className="dynamic_text green_gradient mb-2 block font-medium"
          >
            Slut dato
          </label>
          <textarea
            id="end"
            value={changedEvent.end}
            onChange={handleChange}
            placeholder={changedEvent?.end || 'Slut'}
            className="dynamic_text textarea-bordered textarea"
          />
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
        <div className="flex justify-between pt-5">
          <button
            onClick={() => handleDelete(event?.id)}
            color={'error'}
            disabled={!event?.id}
            className="btn-error btn-sm btn"
          >
            Slet
          </button>
          <div className="flex gap-7">
            <button
              onClick={onClose}
              color={'error'}
              className="btn-error btn-outline btn-sm btn"
            >
              Fortryd
            </button>
            <button onClick={handleSubmit} className="btn-info btn-sm btn">
              {isNew ? 'Opret' : 'Opdatér'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
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
