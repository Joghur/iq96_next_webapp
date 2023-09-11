import cloudinary from 'cloudinary';

import { SearchResult } from '@app/bibliothek/galleri/page';
import PdfGrid from '@components/library/PdfGrid';
import { ForceRefresh } from '@components/ui/force-refresh';

export default async function VedtagterPage() {
  const results = (await cloudinary.v2.search
    .expression('resource_type:image AND public_id:Vedtægter')
    .sort_by('public_id', 'desc')
    .max_results(10)
    .execute()) as { resources: SearchResult[] };

  return (
    <section>
      <ForceRefresh />
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Vedtægter</h1>
        </div>
        {results.resources.length > 0 ? (
          <PdfGrid pdfs={results.resources} label={false} />
        ) : (
          <p>Ingen vedtægter fundet</p>
        )}
      </div>
    </section>
  );
}
