import Link from 'next/link';
import { ReactNode } from 'react';

import UploadButton from '@components/library/gallery/UploadButton';
import { LibraryCard } from '@components/library/LibraryCard';
import PageLayout from '@components/ui/PageLayout';

import { categories } from '../layout';

export type SearchResult = {
  public_id: string;
  tags: string[];
};

export type EventLabel = {
  label: string;
  shortLabel: string;
  icon: ReactNode;
};

const GalleryPage = async () => {
  return (
    <PageLayout>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Galleri</h1>
          <UploadButton />
        </div>
        <div className="flex m-auto flex-col gap-4">
          {categories.map((category: EventLabel) => (
            <Link
              key={category.shortLabel}
              href={`/bibliothek/galleri/${category.shortLabel}`}
            >
              <LibraryCard cardTitle={category.label} />
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default GalleryPage;
