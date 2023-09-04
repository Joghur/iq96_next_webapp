import cloudinary from 'cloudinary';

import EventsButton from '@components/library/gallery/EventsButton';
import UploadButton from '@components/library/gallery/upload-button';
import PageLayout from '@components/ui/PageLayout';

export type SearchResult = {
  public_id: string;
  tags: string[];
};

const GalleryPage = async () => {
  return (
    <PageLayout>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Galleri</h1>
          <UploadButton />
        </div>
        <div>
          <EventsButton label="tour" />
          <EventsButton label="gf" />
          <EventsButton label="events" />
        </div>
      </div>
    </PageLayout>
  );
};

export default GalleryPage;
