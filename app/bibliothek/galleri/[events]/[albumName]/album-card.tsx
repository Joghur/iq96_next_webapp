/* eslint-disable prettier/prettier */
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import { Folder } from '@app/bibliothek/galleri/[events]/page';
import { prettyImageFolderLabel } from '@lib/utils';

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
        <CardTitle>{prettyImageFolderLabel(folder.name)}</CardTitle>
        <CardDescription>
          Billeder fra {event} {prettyImageFolderLabel(folder.name)}
        </CardDescription>
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
