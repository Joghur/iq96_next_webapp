import cloudinary from 'cloudinary';

import { SearchResult } from '@app/bibliothek/galleri/page';
import UploadButton from '@features/library/gallery/UploadButton';
import { ForceRefresh } from '@components/ui/force-refresh';
import PageLayout from '@components/PageLayout';

import PdfGrid from '../../../../features/library/PdfGrid';

export default async function EventsPage({
  params: { year },
}: {
  params: {
    year: string;
  };
}) {
  const lettersFolder = 'letters';
  const results = (await cloudinary.v2.search
    .expression(
      `resource_type:image AND public_id:${lettersFolder}/brev${year.slice(
        -2
      )}*`
    )
    .sort_by('public_id', 'desc')
    .max_results(10)
    .execute()) as { resources: SearchResult[] };

  return (
    <PageLayout>
      <ForceRefresh />
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">{year}</h1>
          <div className="flex flex-col justify-center">
            <div>
              <UploadButton folder={lettersFolder} />
            </div>
            <div>
              <p>OBS! Filnavn eksempel</p>
              <p>brevÅÅ-MM-DD_Evt. tekst</p>
            </div>
          </div>
        </div>
        {results.resources.length > 0 ? (
          <PdfGrid pdfs={results.resources} />
        ) : (
          <p>Ingen pdf filer fundet</p>
        )}
      </div>
    </PageLayout>
  );
}
