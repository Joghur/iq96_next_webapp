import { format, parseISO } from 'date-fns';
import { da } from 'date-fns/locale';
import { EventType } from './EventsPage';
import EventBulletPoints from './EventBulletPoints';

type Props = {
  data: EventType;
};

const TourCard = ({ data }: Props) => {
  return (
    <div className="text-white">
      {data.dayEvents.map((day, index) => (
        <>
          <div
            key={day.dateString}
            className={`rounded-md p-3 mb-3 ${
              index === 0
                ? 'bg-slate-400 border-2 rounded-lg shadow-lg border-orange-400'
                : 'bg-slate-400'
            }`}
          >
            <h3
              className={`${index === 0 ? 'font-extrabold' : 'font-small'} mb-2`}
            >
              📅{' '}
              {format(parseISO(day.dateString), 'EEEE - dd. MMMM', {
                locale: da,
              })}
            </h3>
            <ul className="text-left">
              {day.entries.map((entry, j) => (
                <li key={j} className="mb-1 flex items-center gap-2">
                  <span
                    className={`dynamic_text ${index === 0 ? 'font-extrabold' : 'font-small'} w-[60px] text-right flex-shrink-0`}
                  >
                    {entry.time}
                  </span>
                  <span
                    className={`dynamic_text px-2 py-0.5 rounded-full ${index === 0 ? 'font-medium' : 'font-small'} ${
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
          {data.notesActivities && index === 0 && (
            <p
              key={`notes-activity-${day.dateString}`}
              className="text-md text-slate-400 mt-0 mb-6"
            >
              <EventBulletPoints
                pointsString={data.notesActivities.trim()}
                event={data}
              />
            </p>
          )}
        </>
      ))}
    </div>
  );
};

export default TourCard;
