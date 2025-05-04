import Link from 'next/link';
import { Fragment } from 'react';

import { Button } from '@features/ui/button';

interface Props {
  label: string;
}

const EventsButton = ({ label }: Props) => {
  return (
    <Fragment>
      <Button
        asChild
        variant="ghost"
        className="w-full justify-start flex gap-2"
      >
        <Link href={`/bibliothek/galleri/${label.toLowerCase()}`}>{label}</Link>
      </Button>
    </Fragment>
  );
};

export default EventsButton;
