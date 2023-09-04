/* eslint-disable prettier/prettier */
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { EventLabel } from './page';

export function GalleryCard({ label }: { label: EventLabel }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{label.label}</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild>
          <Link href={`/bibliothek/galleri/${label.shortLabel}`}>
            Se gallerier
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
