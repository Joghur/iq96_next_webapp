import cloudinary from 'cloudinary';

import { SearchResult } from '../../page';
import AlbumGrid from './album-grid';

export default async function EventsPage({
  params: { albumName, events },
}: {
  params: {
    events: string;
    albumName: string;
  };
}) {
  const folder = `${events}/${albumName}`;

  const results = (await cloudinary.v2.search
    .expression(`resource_type:image AND folder:${folder}`)
    .sort_by('created_at', 'desc')
    .max_results(100)
    .execute()) as { resources: SearchResult[] };

  return (
    <section>
      {/* <ForceRefresh /> */}

      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">{albumName}</h1>
        </div>

        <AlbumGrid images={results.resources} />
      </div>
    </section>
  );
}
