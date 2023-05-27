import { useState } from 'react';
import { User } from 'firebase/auth';
import { MdEdit } from 'react-icons/md';

import HeaderTitle from '@components/layout/HeaderTitle';
import LoadingSpinner from '@components/utility/LoadingSpinner';
import { handleType } from '@lib/convertEventType';
import { DocumentUser, useFirestore } from '@lib/hooks/useFirestore';

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
      <div className="container px-6 pt-16 mx-auto">
        <p className="dynamic_text">Der er ingen events på dette tidspunkt</p>
      </div>
    );
  }

  const handleUpdate = async (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string | undefined,
  ) => {
    if (!id) {
      return;
    }

    setCurrentEvent(
      () => events?.filter(o => o.id === id)[0] as unknown as EventType,
    );
    setShowDialog(true);
  };

  const canEdit =
    documentUser?.isAdmin ||
    documentUser?.isBoard ||
    documentUser?.isSuperAdmin;

  return (
    <div>
      <HeaderTitle title={'Begivenheder'} />
      <div className="">
        {!events && (
          <div className="container px-6 pt-16 mx-auto">
            <p className="dynamic_text">
              Der er ingen events på dette tidspunkt
            </p>
          </div>
        )}
        {events &&
          events.map(event => {
            return (
              <div className="paper m-5 py-7 px-10 sm:px-15">
                <div className="stack gap-2">
                  <div className="stack_row justify-between">
                    <p className="dynamic_text font-black">
                      {event?.type === 'tour'
                        ? `${handleType(event?.type)} de ${event.city}`
                        : handleType(event?.type)}
                    </p>
                    {canEdit && event.id && (
                      <button onClick={e => handleUpdate(e, event.id)}>
                        <MdEdit />
                      </button>
                    )}
                  </div>
                  {!!event?.startDate && (
                    <div className="stack">
                      <p className="dynamic_text font-black">Start:</p>
                      <div className="ml-2">
                        <div>{event.start}</div>
                      </div>
                    </div>
                  )}
                  {!!event?.endDate && (
                    <div className="stack">
                      <p className="dynamic_text font-black">Slut:</p>
                      <div className="ml-2">
                        <p>{event.end}</p>
                      </div>
                    </div>
                  )}
                  {event.meetingPoints.trim() && (
                    <div className="stack">
                      <p className="dynamic_text font-black">Mødesteder:</p>
                      <div className="dynamic_text">
                        {event.meetingPoints.split('--').map((f: string) => {
                          return (
                            <div className="ml-4">
                              <li>{f.trim()}</li>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {event?.notes?.trim() && (
                    <div className="stack">
                      <div className="dynamic_text font-black">OBS:</div>
                      <div className="dynamic_text">
                        {event.notes.split('--').map((f: string) => {
                          return (
                            <div className="ml-4 dynamic_text">
                              <li>{f.trim()}</li>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {event?.activities?.trim() && (
                    <div className="dynamic_text font-black">
                      Aktiviteter:
                      {event.activities.split('--').map((f: string) => {
                        return (
                          <div className="ml-4 dynamic_text">
                            <li>{f.trim()}</li>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
      {/* {showDialog && (
        <FormDialog
          open={showDialog}
          onClose={() => setShowDialog(false)}
          event={currentEvent || undefined}
          updatingDoc={updatingDoc}
        />
      )} */}
    </div>
  );
};

export default EventsPage;
