import { Fragment } from 'react';
import { DayEventType, EventType } from './EventsPage';
import EventBulletPoints from './EventBulletPoints';
import ShowDateTime from '@components/ShowDateTime';
import {
  MdGroups,
  MdHotel,
  MdLocalActivity,
  MdLocationPin,
  MdOutlineDinnerDining,
  MdOutlineRestaurant,
  MdOutlineTour,
  MdPlayArrow,
  MdTableRestaurant,
  MdWineBar,
} from 'react-icons/md';
import { FaBeer, FaBolt, FaCocktail, FaTasks } from '@node_modules/react-icons/fa';

type Props = {
  event: EventType;
};

const selectIcon = (type: DayEventType) => {
  switch (type) {
    case 'activity':
      return <FaBolt />;

    case 'meeting':
      return <MdGroups />;

    case 'hotel':
      return <MdHotel />;

    case 'bar':
      return <MdWineBar />;

    case 'restaurant':
      return <MdOutlineRestaurant />;

    case 'guidedTour':
      return <MdOutlineTour />;

    case 'meetingPoint':
      return <MdLocationPin />;

    default:
      return <></>;
  }
};

const TourCard = ({ event }: Props) => {
  return (
    <div className="text-white">
      {event.dayEvents.map((day, index) => (
        <Fragment key={day.dateString}>
          <div
            className={`rounded-md p-1 sm:p-3 ${
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
            <ul className="w-full text-left">
              {day.entries.map((entry, innerIndex) => (
                <li
                  key={innerIndex}
                  className="m-1 flex w-full text-left items-center justify-start gap-2"
                >
                  <span
                    className={`dynamic_text ${index === 0 ? 'font-extrabold' : 'font-small'} sm:min-w-[60px] text-left`}
                  >
                    {entry.time}
                  </span>
                  {selectIcon(entry.type)}
                  <span
                    className={`dynamic_text px-2 sm:px-3 py-0.5 rounded-full leading-tight ${index === 0 ? 'font-medium' : 'font-normal'} ${
                      entry.type === 'hotel' ||
                      entry.type === 'restaurant' ||
                      entry.type === 'meeting'
                        ? 'bg-green-300 text-white'
                        : entry.type === 'meetingPoint'
                          ? 'bg-red-300 text-white'
                          : 'bg-blue-300 text-slate-600'
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
