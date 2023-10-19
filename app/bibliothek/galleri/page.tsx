import { ReactNode } from 'react';

import GalleryGrid from '@components/library/gallery/Gallery-Grid';
import PageLayout from '@components/ui/PageLayout';

import { galleryCategories } from '../layout';

export type SearchResult = {
  public_id: string;
  tags: string[];
  pages?: string;
  filename: string;
};

export type LibraryTypes = 'letters' | 'galleries' | 'song';

export type EventLabel = {
  label: string;
  shortLabel: string;
  icon: ReactNode;
  type: LibraryTypes;
};

const GalleryPage = async ({
  searchParams: { badge },
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  return (
    <PageLayout>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Galleri</h1>
        </div>
        <GalleryGrid galleryCategories={galleryCategories} badge={badge} />
      </div>
    </PageLayout>
  );
};

export default GalleryPage;
