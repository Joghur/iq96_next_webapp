import cloudinary from 'cloudinary';

import UploadButton from '@components/library/gallery/upload-button';
import { convertFromUrlSafe, prettyImageFolderLabel } from '@lib/utils';

import { SearchResult } from '../../page';
import AlbumGrid from './album-grid';

export default async function EventsPage({
  params: { galleryName, events },
}: {
  params: {
    events: string;
    galleryName: string;
  };
}) {
  const folder = `${events}/${convertFromUrlSafe(galleryName)}`;
  console.log('EventsPage - folder', folder);

  const results = (await cloudinary.v2.search
    .expression(`resource_type:image AND folder:${folder}`)
    .sort_by('public_id', 'desc')
    .max_results(300)
    .execute()) as { resources: SearchResult[] };

  return (
    <section>
      {/* <ForceRefresh /> */}
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">
            {prettyImageFolderLabel(convertFromUrlSafe(galleryName))}
          </h1>
          {/* <UploadButton folder={folder} /> */}
        </div>
        <AlbumGrid images={results.resources} />
      </div>
    </section>
  );
}
