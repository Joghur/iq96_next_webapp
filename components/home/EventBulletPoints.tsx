import EventInfoBadge from '@components/ui/EventInfoBadge';
import Link from 'next/link';
import { ReactNode } from 'react';
import {
  MdOutlineDining,
  MdOutlineHotel,
  MdOutlineLunchDining,
} from 'react-icons/md';
import { EventType } from './EventsPage';

type Props = { pointsString: string; event: EventType };

const EventBulletPoints = ({ pointsString, event }: Props) => {
  const points = pointsString.split('--');

  const yearCity = `${event.year}-${event.city}`;

  // Notes. For the time being event.hotelLocation is holding year-city (f.ex. 2024-tallinn)
  // Which is the only information needed for going to the right map part
  return (
    <div>
      {points.map((point: string, index) => {
        if (point.includes('<link:hotel>')) {
          const parts = point.split('<link:hotel>');
          return (
            <div key={index} className="ml-4">
              <li>
                {`${parts[0]} `}
                {handleBulletPoint(yearCity, 'hotel')}
                {` ${parts.length > 1 && parts[1]}`}
              </li>
            </div>
          );
        }
        if (point.includes('<link:middag>')) {
          const parts = point.split('<link:middag>');
          return (
            <div key={index} className="ml-4">
              <li>
                {`${parts[0]} `}
                {handleBulletPoint(yearCity, 'middag')}
                {` ${parts.length > 1 && parts[1]}`}
              </li>
            </div>
          );
        }
        if (point.includes('<link:frokost>')) {
          const parts = point.split('<link:frokost>');
          return (
            <div key={index} className="ml-4">
              <li>
                {`${parts[0]} `}
                {handleBulletPoint(yearCity, 'frokost')}
                {` ${parts.length > 1 && parts[1]}`}
              </li>
            </div>
          );
        }
        if (point.includes('<link:tour>')) {
          const parts = point.split('<link:tour>');
          return (
            <div key={index} className="ml-4">
              <li>
                {`${parts[0]} `}
                {handleBulletPoint(yearCity, 'tour')}
                {` ${parts.length > 1 && parts[1]}`}
              </li>
            </div>
          );
        }

        return (
          <div key={index} className="ml-4">
            <li>{handleBulletPoint(point.trim())}</li>
          </div>
        );
      })}
    </div>
  );
};

export default EventBulletPoints;

const handleBulletPoint = (
  yearCity: string | undefined,
  type?:
    | 'string'
    | 'hotel'
    | 'frokost'
    | 'middag'
    | 'tour'
    | 'extra1'
    | 'extra2'
): ReactNode => {
  switch (type) {
    case 'hotel':
      return (
        <Link
          href={`/kort?aar-by=${yearCity}&sted=Vores hotel`}
          prefetch={false}
          className="whitespace-nowrap"
        >
          <EventInfoBadge>
            <MdOutlineHotel className="mr-1" />
            Hotel
          </EventInfoBadge>
        </Link>
      );

    case 'middag':
      return (
        <Link
          href={`/kort?aar-by=${yearCity}&sted=Vores middag`}
          prefetch={false}
          className="whitespace-nowrap"
        >
          <EventInfoBadge>
            <MdOutlineDining className="mr-1" />
            Middag
          </EventInfoBadge>
        </Link>
      );

    case 'frokost':
      return (
        <Link
          href={`/kort?aar-by=${yearCity}&sted=Vores frokost`}
          prefetch={false}
          className="whitespace-nowrap"
        >
          <EventInfoBadge>
            <MdOutlineLunchDining className="mr-1" />
            Frokost
          </EventInfoBadge>
        </Link>
      );

    case 'tour':
      return (
        <Link
          href={`/kort?aar-by=${yearCity}&sted=Guided tour`}
          prefetch={false}
          className="whitespace-nowrap"
        >
          <EventInfoBadge>
            <MdOutlineLunchDining className="mr-1" />
            Guided tour
          </EventInfoBadge>
        </Link>
      );

    default:
      return yearCity;
  }
};
