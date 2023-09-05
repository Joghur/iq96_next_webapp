import UploadButton from '@components/library/gallery/upload-button';
import PageLayout from '@components/ui/PageLayout';

import { categories } from '../layout';
import { GalleryCard } from './gallery-card';

export type SearchResult = {
  public_id: string;
  tags: string[];
};

export type EventLabel = {
  label: string;
  shortLabel: string;
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
            <GalleryCard key={category.shortLabel} label={category} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default GalleryPage;
