import { eventTransitionVariants } from '@lib/animations';
import { EventType } from '../EventsPage';
import { motion } from 'framer-motion';
import { handleType } from '@lib/convert';
import EditButton from '@components/buttons/EditButton';
import ShowDateTime from '@components/dates/ShowDateTime';

type Props = {
  futureEvents: EventType[];
  theme: string;
  canEdit: boolean;
  onUpdate: (id: string | undefined) => Promise<void>;
};

const FutureEvents = ({ futureEvents, theme, canEdit, onUpdate }: Props) => {
  return (
    <div className="mx-10 my-3 gap-2">
      <motion.div
        variants={eventTransitionVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        {futureEvents.length > 0 && (
          <div className="mb-4 pt-6 sm:pt-16">
            <p className="text-center text-[larger] font-bold">Fremtidig</p>
          </div>
        )}
        {futureEvents.map((futureEvent, index) => {
          return (
            <div
              key={index}
              className={`sm:px-15 paper ${theme === 'dark' ? 'bg-gray-800' : 'bg-slate-50'} flex flex-col gap-2 overflow-hidden rounded-xl px-10`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold">
                  {futureEvent?.type === 'tour'
                    ? `${handleType(futureEvent?.type)} de ${futureEvent.city}`
                    : handleType(futureEvent?.type)}
                </p>
                <ShowDateTime dateTime={futureEvent.start} showTime={false} />
                {canEdit && futureEvent.id && (
                  <EditButton onClick={() => onUpdate(futureEvent.id)} />
                )}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default FutureEvents;
