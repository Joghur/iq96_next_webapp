import { useTailwindBreakpoint } from '@lib/hooks/useTailwindBreakpoint';
import { format, parseISO } from '@node_modules/date-fns';
import { da } from '@node_modules/date-fns/locale';

type Props = {
  dateString: string;
};

const ShowDateTime = ({ dateString }: Props) => {
  const isLargeScreen = useTailwindBreakpoint('md');
  console.log('dateString', dateString);
  return (
    <>
      {format(
        parseISO(dateString),
        isLargeScreen ? 'EEEE - dd. MMMM' : 'EEEE',
        {
          locale: da,
        }
      )}
    </>
  );
};

export default ShowDateTime;
