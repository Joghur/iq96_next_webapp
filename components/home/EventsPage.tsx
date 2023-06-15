import { User } from "firebase/auth";
import { motion } from "framer-motion";
import { useState } from "react";
import { MdEdit } from "react-icons/md";

import EventForm from "./EventForm";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import { eventTransitionVariants } from "@lib/animations";
import { handleType } from "@lib/convertEventType";
import { DocumentUser, useFirestore } from "@lib/hooks/useFirestore";

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
  } = useFirestore<EventType>("events", "startDate");
  const [currentEvent, setCurrentEvent] = useState<EventType | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  if (loading) {
    return <LoadingSpinner text={"Henter begivenheder..."} />;
  }

  if (!events) {
    return (
      <div className="mx-auto px-6 pt-20 sm:pt-24">
        <p className="dynamic_text">Der er ingen events på dette tidspunkt</p>
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
    <div>
      <div className="mx-auto max-w-2xl sm:mt-40">
        <div className="mb-4 mt-16 items-center justify-center">
          <p className="dynamic_text text-center">Næste begivenhed</p>
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
                    type: "tween",
                  }}
                >
                  <div key={index} className="sm:px-15 paper rounded-xl px-10">
                    <div className="flex justify-between">
                      <p className="dynamic_text">
                        {event?.type === "tour"
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
                      <div className="flex flex-col">
                        <p className="dynamic_text">Start:</p>
                        <div className="">
                          <div>{event.start}</div>
                        </div>
                      </div>
                    )}
                    {!!event?.endDate && (
                      <div className="flex flex-col">
                        <p className="dynamic_text">Slut:</p>
                        <div className="">
                          <p>{event.end}</p>
                        </div>
                      </div>
                    )}
                    {event.meetingPoints.trim() && (
                      <div className="flex flex-col">
                        <p className="dynamic_text mt-4">Mødesteder:</p>
                        <div className="dynamic_text">
                          {event.meetingPoints
                            .split("--")
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
                        <div className="dynamic_text mt-4">OBS:</div>
                        <div className="dynamic_text">
                          {event.notes.split("--").map((f: string, index) => {
                            return (
                              <div key={index} className="dynamic_text ml-4">
                                <li>{f.trim()}</li>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {event?.activities?.trim() && (
                      <div className="dynamic_text">
                        Aktiviteter:
                        {event.activities
                          .split("--")
                          .map((f: string, index) => {
                            return (
                              <div key={index} className="dynamic_text ml-4">
                                <li>{f.trim()}</li>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
              {index === 1 && (
                <div key={`events-${index}`} className="mb-4 pt-6 sm:pt-16">
                  <p className="dynamic_text text-center">
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
                  <div className="paper py-2">
                    <div className="flex items-center justify-between">
                      <p className="dynamic_text">
                        {event?.type === "tour"
                          ? `${handleType(event?.type)} de ${event.city}`
                          : handleType(event?.type)}
                      </p>
                      <p className="dynamic_text">{event.start}</p>
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
