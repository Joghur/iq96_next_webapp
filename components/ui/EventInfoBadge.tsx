import { ReactNode } from 'react';
import { Badge } from './badge';

interface Props {
  children: ReactNode;
}

const EventInfoBadge = ({ children }: Props) => {
  return (
    <Badge
      variant="outline"
      className={'dynamic_text p-1 border border-red-500'}
    >
      {children}
    </Badge>
  );
};

export default EventInfoBadge;
