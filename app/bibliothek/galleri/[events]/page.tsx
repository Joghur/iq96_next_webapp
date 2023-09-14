import cloudinary from 'cloudinary';
import Link from 'next/link';

import { LibraryCard } from '@components/library/LibraryCard';
import PageLayout from '@components/ui/PageLayout';
// eslint-disable-next-line prettier/prettier
import { convertLabels, prettyImageFolderLabel, sortObjectArray } from '@lib/utils';

export type Folder = { name: string; path: string };

export default async function GalleryPage({
  params: { events },
}: {
  params: {
    events: string;
  };
}) {
  const { folders } = (await cloudinary.v2.api.sub_folders(events)) as {
    folders: Folder[];
  };

  const sortedArray = sortObjectArray<Folder>(folders, {
    property: 'name',
    order: 'desc',
  });

  return (
    <PageLayout>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">{convertLabels(events)}</h1>
        </div>

        <div className="grid sm:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-4">
          {sortedArray.map((folder) => (
            <Link
              href={`/bibliothek/galleri/${events}/${folder.name}`}
              key={folder.path}
            >
              <LibraryCard cardTitle={prettyImageFolderLabel(folder.name)} />
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
