import { handleType } from '@lib/convert';
import { EventType } from '../EventsPage';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MdOutlineHotel } from '@node_modules/react-icons/md';
import { ImageIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import EventBulletPoints from '../EventBulletPoints';
import TourCard from '../TourCard';
import EditButton from '@components/buttons/EditButton';
import EventInfoBadge from '@components/EventInfoBadge';
import ShowDateTime from '@components/dates/ShowDateTime';

type Props = {
  nextEvents: EventType[];
  theme: string;
  canEdit: boolean;
  onUpdate: (id: string | undefined) => Promise<void>;
};

const NextEvents = ({ nextEvents, theme, canEdit, onUpdate }: Props) => {
  return (
    <>
      {nextEvents.length > 0 && (
        <div className="mb-4 mt-16 items-center justify-center">
          <p className="text-center text-[larger] font-bold">Næste</p>
        </div>
      )}
      {nextEvents.map((nextEvent, index) => {
        return (
          <div key={index} className="w-full sm:px-6">
            <motion.div
              key={`sd${index}`}
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              transition={{
                duration: 0.8,
                type: 'tween',
              }}
            >
              <div
                key={index}
                className={`sm:px-15 paper ${theme === 'dark' ? 'bg-gray-600' : 'bg-slate-200'} flex flex-col gap-2 overflow-hidden rounded-xl px-10`}
              >
                <div className="flex justify-between align-middle">
                  <p className="font-semibold">
                    {nextEvent?.type === 'tour'
                      ? `${handleType(nextEvent?.type)} de ${nextEvent.city}`
                      : handleType(nextEvent?.type)}
                  </p>
                  {canEdit && nextEvent.id && (
                    <EditButton onClick={() => onUpdate(nextEvent.id)} />
                  )}
                </div>
                {!!nextEvent?.start && (
                  <div className="flex justify-center gap-2">
                    <div className="dynamic_text orange_gradient flex text-center text-[larger]">
                      <ShowDateTime
                        dateTime={nextEvent.start}
                        formatLargeScreen="EEEE - dd. MMMM"
                        formatSmallScreen="EEEE - dd. MMM"
                      />
                    </div>
                    {!!nextEvent?.end?.date.trim() && (
                      <>
                        <div className="dynamic_text">til</div>
                        <div className="flex">
                          <ShowDateTime
                            dateTime={nextEvent.end}
                            showTime={false}
                            formatLargeScreen="EEEE - dd. MMMM"
                            formatSmallScreen="EEEE - dd. MMM"
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}
                <div className="flex justify-evenly">
                  {nextEvent.showMapLink &&
                    nextEvent.type === 'tour' &&
                    nextEvent?.city && (
                      <Link
                        href={`/kort?aar-by=${nextEvent?.year}-${nextEvent?.city?.trim()}&sted=Vores hotel`}
                        prefetch={false}
                        className="whitespace-nowrap"
                      >
                        <EventInfoBadge>
                          <MdOutlineHotel className="mr-1" />
                          Hotel
                        </EventInfoBadge>
                      </Link>
                    )}
                  {nextEvent.showInfoLink &&
                    nextEvent.showInfoLink &&
                    nextEvent?.year && (
                      <Link
                        href={`/bibliothek/breve/${nextEvent.year}`}
                        prefetch={false}
                        className="whitespace-nowrap"
                      >
                        <EventInfoBadge>
                          <InfoCircledIcon className="mr-1" />
                          Info
                        </EventInfoBadge>
                      </Link>
                    )}
                  {nextEvent.showUploadButton &&
                    nextEvent?.type === 'tour' &&
                    nextEvent?.year &&
                    nextEvent?.city && (
                      <Link
                        href={`/bibliothek/galleri/tour/${nextEvent.year}-${nextEvent.city.toLocaleLowerCase()}`}
                        prefetch={false}
                        className="whitespace-nowrap"
                      >
                        <EventInfoBadge>
                          <ImageIcon className="mr-1" />
                          Upload
                        </EventInfoBadge>
                      </Link>
                    )}
                  {nextEvent.showUploadButton &&
                    nextEvent?.type === 'gf' &&
                    nextEvent?.year && (
                      <Link
                        href={`/bibliothek/galleri/gf/${nextEvent.year}`}
                        prefetch={false}
                        className="whitespace-nowrap"
                      >
                        <EventInfoBadge>
                          <ImageIcon className="mr-1" />
                          Upload
                        </EventInfoBadge>
                      </Link>
                    )}
                  {nextEvent.showUploadButton &&
                    nextEvent?.type === 'oel' &&
                    nextEvent?.year && (
                      <Link
                        href={`/bibliothek/galleri/events/${nextEvent.year}-øl`}
                        prefetch={false}
                        className="whitespace-nowrap"
                      >
                        <EventInfoBadge>
                          <ImageIcon className="mr-1" />
                          Upload
                        </EventInfoBadge>
                      </Link>
                    )}
                  {nextEvent.showUploadButton &&
                    nextEvent?.type === 'golf' &&
                    nextEvent?.year && (
                      <Link
                        href={`/bibliothek/galleri/events/${nextEvent.year}-frisbee`}
                        prefetch={false}
                        className="whitespace-nowrap"
                      >
                        <EventInfoBadge>
                          <ImageIcon className="mr-1" />
                          Upload
                        </EventInfoBadge>
                      </Link>
                    )}
                </div>
                {nextEvent?.notes && (
                  <div className="flex flex-col">
                    <div className="mt-4">OBS:</div>
                    <div>
                      <EventBulletPoints
                        pointsString={nextEvent.notes.trim()}
                        event={nextEvent}
                      />
                    </div>
                  </div>
                )}
                {nextEvent.dayEvents.length > 0 && (
                  <>
                    {nextEvent.end.date !== '' && (
                      <div className="dynamic_text mt-2">Aktiviteter</div>
                    )}
                    <div className="w-full">
                      <TourCard event={nextEvent} />
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        );
      })}
    </>
  );
};

export default NextEvents;
