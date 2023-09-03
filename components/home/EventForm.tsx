'use client';

import { ChangeEvent, useState } from 'react';
import { EventType } from './EventsPage';
import Modal from '@components/ui/Modal';

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
            htmlFor="password"
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
            htmlFor="password"
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
        <div>
          <p className="dynamic_text">
            Brug &quot;--&quot; til at separere emner
          </p>
        </div>
        <div className="pt-5">
          <label
            htmlFor="password"
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
            htmlFor="password"
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
            htmlFor="password"
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
