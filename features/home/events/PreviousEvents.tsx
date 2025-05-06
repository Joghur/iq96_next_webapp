import { EventType } from '../EventsPage';
import { motion } from 'framer-motion';
import { eventTransitionVariants } from '@lib/animations';
import { handleType } from '@lib/convert';
import Link from 'next/link';
import { ImageIcon } from '@radix-ui/react-icons';
import EditButton from '@components/buttons/EditButton';
import EventInfoBadge from '@components/ui/EventInfoBadge';

type Props = {
  previousEvents: EventType[];
  theme: string;
  canEdit: boolean;
  onUpdate: (id: string | undefined) => Promise<void>;
};

const PreviousEvents = ({
  previousEvents,
  theme,
  canEdit,
  onUpdate,
}: Props) => {
  return (
    <div className="mx-10 my-3 gap-2">
      <motion.div
        variants={eventTransitionVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 1.6 }}
      >
        {previousEvents.length > 0 && (
          <div className="mb-4 mt-16 items-center justify-center">
            <p className="text-center text-[larger] font-bold">Tidligere</p>
          </div>
        )}
        {previousEvents.map((previousEvent, index) => {
          return (
            <div
              key={index}
              className={`paper ${theme === 'dark' ? 'bg-gray-800' : 'bg-slate-50'} 
    flex flex-col gap-2 rounded-xl px-6 py-4 sm:px-10 sm:py-6 w-full max-w-2xl mx-auto`}
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold">
                  {previousEvent?.type === 'tour'
                    ? `${handleType(previousEvent?.type)} de ${previousEvent.city}`
                    : handleType(previousEvent?.type)}
                </p>
                <div className="flex justify-evenly">
                  {previousEvent.showUploadButton &&
                    previousEvent?.type === 'tour' &&
                    previousEvent?.year &&
                    previousEvent?.city && (
                      <Link
                        href={`/bibliothek/galleri/tour/${previousEvent.year}-${previousEvent.city.toLocaleLowerCase()}`}
                        prefetch={false}
                        className="whitespace-nowrap"
                      >
                        <EventInfoBadge>
                          <ImageIcon className="mr-1" />
                          Upload
                        </EventInfoBadge>
                      </Link>
                    )}
                  {previousEvent.showUploadButton &&
                    previousEvent?.type === 'gf' &&
                    previousEvent?.year && (
                      <Link
                        href={`/bibliothek/galleri/gf/${previousEvent.year}`}
                        prefetch={false}
                        className="whitespace-nowrap"
                      >
                        <EventInfoBadge>
                          <ImageIcon className="mr-1" />
                          Upload
                        </EventInfoBadge>
                      </Link>
                    )}
                  {previousEvent.showUploadButton &&
                    previousEvent?.type === 'oel' &&
                    previousEvent?.year && (
                      <Link
                        href={`/bibliothek/galleri/events/${previousEvent.year}-øl`}
                        prefetch={false}
                        className="whitespace-nowrap"
                      >
                        <EventInfoBadge>
                          <ImageIcon className="mr-1" />
                          Upload
                        </EventInfoBadge>
                      </Link>
                    )}
                  {previousEvent.showUploadButton &&
                    previousEvent?.type === 'golf' &&
                    previousEvent?.year && (
                      <Link
                        href={`/bibliothek/galleri/events/${previousEvent.year}-frisbee`}
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
                {canEdit && previousEvent.id && (
                  <EditButton onClick={() => onUpdate(previousEvent.id)} />
                )}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default PreviousEvents;
