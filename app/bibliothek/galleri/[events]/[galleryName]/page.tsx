import cloudinary from 'cloudinary';

import UploadButton from '@features/library/gallery/UploadButton';
import { ForceRefresh } from '@components/ui/force-refresh';
import PageLayout from '@components/PageLayout';
import { convertFromUrlSafe, prettyImageFolderLabel } from '@lib/utils';

import { SearchResult } from '../../page';
import AlbumGrid from './album-grid';

export default async function EventsPage(
  props: {
    params: Promise<{
      events: string;
      galleryName: string;
    }>;
  }
) {
  const params = await props.params;

  const {
    galleryName,
    events
  } = params;

  const folder = `${events}/${convertFromUrlSafe(galleryName)}`;

  const results = (await cloudinary.v2.search
    .expression(`resource_type:image AND folder:${folder}`)
    .sort_by('public_id', 'desc')
    .max_results(300)
    .execute()) as { resources: SearchResult[] };

  return (
    <PageLayout>
      <ForceRefresh />
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">
            {prettyImageFolderLabel(convertFromUrlSafe(galleryName))}
          </h1>
          <UploadButton folder={folder} />
        </div>
        <AlbumGrid
          images={results.resources}
          event={events}
          year={galleryName.split('-')[0]}
        />
      </div>
    </PageLayout>
  );
}
