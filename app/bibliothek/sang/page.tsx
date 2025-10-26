import cloudinary from 'cloudinary';

import { SearchResult } from '@app/bibliothek/galleri/page';
import PdfGrid from '@features/library/PdfGrid';
import { ForceRefresh } from '@components/ui/force-refresh';
import PageLayout from '@components/PageLayout';

export default async function VedtagterPage() {
  const results = (await cloudinary.v2.search
    .expression('resource_type:image AND public_id:IQ_sangen_GF_2023')
    .sort_by('public_id', 'desc')
    .max_results(10)
    .execute()) as { resources: SearchResult[] };

  // TODO: Export  authors to PDF file
  return (
    <PageLayout>
      <ForceRefresh />
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">IQ sangen</h1>
        </div>
        {results.resources.length > 0 ? (
          <PdfGrid pdfs={results.resources} label={false} />
        ) : (
          <p>Ingen sang fundet</p>
        )}
        <h4 className="dynamic_text font-bold mt-10">Sangskrivere</h4>
        <p className="dynamic_text">
          <span className="font-bold">IQ96, 2003, 2012, 2013</span> – Nestor
        </p>
        <p className="dynamic_text">
          <span className="font-bold">2004</span> – Poppe
        </p>
        <p className="dynamic_text">
          <span className="font-bold">2014</span> – Søsterkysser, Redacteur,
          Æselridder og Kasseur
        </p>
        <p className="dynamic_text">
          <span className="font-bold">1997-2000, 2008-2009, 2018</span> –
          Benjamin, Redacteur
        </p>
        <p className="dynamic_text">
          <span className="font-bold">
            2001-2002, 2005-2007, 2010-2011, 2015-2017, 2019-2024
          </span>{' '}
          – Redacteur
        </p>
        <p className="dynamic_text">
          <span className="font-bold">
            2025
          </span>{' '}
          – Benjamin, Poppe
        </p>
      </div>
    </PageLayout>
  );
}
