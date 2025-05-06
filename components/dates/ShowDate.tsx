import { useTailwindBreakpoint } from '@lib/hooks/useTailwindBreakpoint';
import { format, parseISO } from '@node_modules/date-fns';
import { da } from '@node_modules/date-fns/locale';

type Props = {
  dateString: string;
  formatLargeScreen?: string;
  formatSmallScreen?: string;
};

const ShowDate = ({
  dateString,
  formatLargeScreen = 'EEEE - dd. MMMM',
  formatSmallScreen = 'EEEE',
}: Props) => {
  const isLargeScreen = useTailwindBreakpoint('md');
  return (
    <>
      {format(
        parseISO(dateString),
        isLargeScreen ? formatLargeScreen : formatSmallScreen,
        {
          locale: da,
        }
      )}
    </>
  );
};

export default ShowDate;
