import { Fragment } from 'react';
import { EventType } from './EventsPage';
import EventBulletPoints from './EventBulletPoints';
import ShowDateTime from '@components/ShowDateTime';

type Props = {
  event: EventType;
};

const TourCard = ({ event }: Props) => {
  return (
    <div className="text-white">
      {event.dayEvents.map((day, index) => (
        <Fragment key={day.dateString}>
          <div
            className={`rounded-md p-3 ${
              index === 0
                ? 'bg-slate-400 border-2 rounded-lg shadow-lg border-orange-400 mb-6'
                : 'bg-slate-400 mb-2'
            }`}
          >
            {event.end !== '' && (
              <h3
                className={`${index === 0 ? 'font-extrabold' : 'font-small'} mb-2 tracking-tight`}
              >
                <ShowDateTime dateString={day.dateString} />
              </h3>
            )}
            <ul className="text-left">
              {day.entries.map((entry, innerIndex) => (
                <li key={innerIndex} className="mb-1 flex items-center gap-2">
                  <span
                    className={`dynamic_text ${index === 0 ? 'font-extrabold' : 'font-small'} min-w-[60px] text-right`}
                  >
                    {entry.time}
                  </span>
                  <span
                    className={`dynamic_text px-2 sm:px-3 py-0.5 rounded-full leading-tight ${index === 0 ? 'font-medium' : 'font-normal'} ${
                      entry.type === 'meetingPoint'
                        ? 'bg-blue-300 text-slate-600'
                        : entry.type === 'dinner'
                          ? 'bg-red-300 text-white'
                          : 'bg-green-300 text-white'
                    }`}
                  >
                    {entry.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {event.notesActivities && index === 0 && (
            <p
              key={`notes-activity-${day.dateString}`}
              className="text-md text-slate-400 mt-0 mb-6"
            >
              <EventBulletPoints
                pointsString={event.notesActivities.trim()}
                event={event}
              />
            </p>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default TourCard;
