import { format, parseISO } from '@node_modules/date-fns';
import { da } from '@node_modules/date-fns/locale';
import { type ReactNode } from 'react';

type Props = {
  dateString: string;
};

const ShowDateTime = ({ dateString }: Props) => {
  console.log('dateString', dateString);
  return (
    <>
      {format(parseISO(dateString), 'EEEE - dd. MMMM', {
        locale: da,
      })}
    </>
  );
};

export default ShowDateTime;
