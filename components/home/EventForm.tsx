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
        <div>
          <p className="dynamic_text">
            Brug &quot;--&quot; til at separere emner
          </p>
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
            htmlFor="moreInfoLink"
            className="dynamic_text green_gradient mb-2 block font-medium"
          >
            Mere info link (Skriv bare år ellers relativt link)
          </label>
          <textarea
            id="moreInfoLink"
            value={changedEvent.moreInfoLink}
            onChange={handleChange}
            placeholder={changedEvent?.moreInfoLink || 'Link til mere info'}
            className="dynamic_text textarea-bordered textarea"
          />
        </div>
        <div className="pt-5">
          <label
            htmlFor="imagesLink"
            className="dynamic_text green_gradient mb-2 block font-medium"
          >
            Billed galleri link (/bibliothek/galleri/ er inkluderet)
          </label>
          <textarea
            id="imagesLink"
            value={changedEvent.imagesLink}
            onChange={handleChange}
            placeholder={changedEvent?.imagesLink || 'Link til billede galleri'}
            className="dynamic_text textarea-bordered textarea"
          />
        </div>
        <div className="pt-5">
          <label
            htmlFor="hotelLocation"
            className="dynamic_text green_gradient mb-2 block font-medium"
          >
            Hotel lokation
          </label>
          <textarea
            id="hotelLocation"
            value={changedEvent.hotelLocation}
            onChange={handleChange}
            placeholder={changedEvent?.hotelLocation || 'Hotel lokation'}
            className="dynamic_text textarea-bordered textarea"
          />
        </div>
        <div className="pt-5">
          <label
            htmlFor="restaurantLocation"
            className="dynamic_text green_gradient mb-2 block font-medium"
          >
            Restaurant lokation
          </label>
          <textarea
            id="restaurantLocation"
            value={changedEvent.restaurantLocation}
            onChange={handleChange}
            placeholder={
              changedEvent?.restaurantLocation || 'Restaurant lokation'
            }
            className="dynamic_text textarea-bordered textarea"
          />
        </div>
        <div className="pt-5">
          <label
            htmlFor="lunchLocation"
            className="dynamic_text green_gradient mb-2 block font-medium"
          >
            Frokost lokation
          </label>
          <textarea
            id="lunchLocation"
            value={changedEvent.lunchLocation}
            onChange={handleChange}
            placeholder={changedEvent?.lunchLocation || 'Frokost lokation'}
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
            placeholder={changedEvent?.extra1Location || 'Ekstra 1 lokation'}
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
            placeholder={changedEvent?.extra2Location || 'Ekstra 2 lokation'}
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
