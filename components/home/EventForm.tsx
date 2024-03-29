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

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event) {
      const { id, value } = event.target;

      setChangingEvent((oldEvent) => ({
        ...oldEvent,
        [id]: value,
      }));
    }
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
        <div className="pt-5">
          <label
            htmlFor="extra1Location"
            className="dynamic_text green_gradient mb-2 block font-medium"
          >
            Extra 1 lokation
          </label>
          <textarea
            id="extra1Location"
            value={changedEvent.extra1Location}
            onChange={handleChange}
            placeholder={changedEvent?.extra1Location || 'År-By og sted'}
            className="dynamic_text textarea-bordered textarea"
          />
        </div>
        <div className="pt-5">
          <label
            htmlFor="extra2Location"
            className="dynamic_text green_gradient mb-2 block font-medium"
          >
            Extra 2 lokation
          </label>
          <textarea
            id="extra2Location"
            value={changedEvent.extra2Location}
            onChange={handleChange}
            placeholder={changedEvent?.extra2Location || 'År-By og sted'}
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
