'use client';

import { ChangeEvent, useState } from 'react';
import { EventType } from './EventsPage';
import Modal from '@components/ui/Modal';
import { CopyButton } from '@components/ui/CopyButton';

const initialEvent: EventType = {
  type: '',
  city: 'Kokkedal',
  country: 'Danmark',
  start: '',
  end: '',
  timezone: 'Europe/Copenhagen',
  year: 0,
  activities: `
    kl. xx - Guided tur i byen, mødested udenfor hotellet kl. xx:xx -- 
    kl. xx - Restaurant, mødested udenfor hotellet kl. xx:xx
    `,
  meetingPoints: `
    Kokkedal ved Centerpubben kl. xx -- 
    Hovedbanegården under uret kl. xx
    `,
};

interface Props {
  event?: EventType;
  open: boolean;
  editable?: boolean;
  onClose: () => void;
  updatingDoc: (id: string, document: EventType) => void;
}

const EventForm = ({
  event,
  open,
  onClose,
  editable = true,
  updatingDoc,
}: Props) => {
  const [changedEvent, setChangingEvent] = useState<EventType>(
    event || initialEvent
  );

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

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;

    setChangingEvent((prevData) => ({
      ...prevData,
      [id]: !prevData[id as keyof EventType],
    }));
  };

  const handleSubmit = () => {
    if (editable && changedEvent?.id) {
      updatingDoc(changedEvent.id, {
        ...changedEvent,
      });
    }
    onClose();
  };

  return (
    <Modal open={open}>
      <h3 className="text-lg font-bold">Opdatér begivenhed</h3>
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
            htmlFor="start"
            className="dynamic_text green_gradient mb-2 block font-medium"
          >
            Start dato
          </label>
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
        <div className="flex flex-col gap-2">
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
            <CopyButton text="<link:extra:Depeche Mode:bar>" />
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
        <div className="pt-5">
          <label
            htmlFor="meetingPoints"
            className="dynamic_text green_gradient mb-2 block font-medium"
          >
            Mødesteder
          </label>
          <textarea
            id="meetingPoints"
            value={changedEvent.meetingPoints}
            onChange={handleChange}
            placeholder={changedEvent?.meetingPoints || 'Mødesteder'}
            className="dynamic_text textarea-bordered textarea"
          />
        </div>
        <div className="pt-5">
          <label
            htmlFor="activities"
            className="dynamic_text green_gradient mb-2 block font-medium"
          >
            Aktiviteter
          </label>
          <textarea
            id="activities"
            value={changedEvent.activities}
            onChange={handleChange}
            placeholder={changedEvent?.activities || 'Aktiviteter'}
            className="dynamic_text textarea-bordered textarea"
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
        <div className="flex justify-between pt-5">
          <button
            onClick={onClose}
            color={'error'}
            className="btn-error btn-outline btn-sm btn"
          >
            Fortryd
          </button>
          <button onClick={handleSubmit} className="btn-info btn-sm btn">
            Opdatér
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EventForm;
