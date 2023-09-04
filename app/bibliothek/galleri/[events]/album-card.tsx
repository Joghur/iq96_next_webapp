/* eslint-disable prettier/prettier */
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';

import { Folder } from './page';

export function AlbumCard({
  folder,
  event,
}: {
  folder: Folder;
  event: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{folder.name}</CardTitle>
        <CardDescription>Billeder fra {event} {folder.name}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild>
          <Link href={`/bibliothek/galleri/${event}/${folder.name}`}>
            Se billeder
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
