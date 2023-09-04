import cloudinary from 'cloudinary';

import CloudinaryImage from '@components/library/gallery/cloudinary-image';
import EventsButton from '@components/library/gallery/EventsButton';
import UploadButton from '@components/library/gallery/upload-button';
import PageLayout from '@components/ui/PageLayout';

const MAX_COLUMNS = 4;

export type SearchResult = {
  public_id: string;
  tags: string[];
};

const GalleryPage = async () => {
  const result = (await cloudinary.v2.search
    .expression('resource_type:image')
    .sort_by('created_at', 'desc')
    .execute()) as { resources: SearchResult[] };

  const getImageColumn = (colIndex: number) => {
    return result.resources.filter((resource, index) => {
      return index % MAX_COLUMNS === colIndex;
    });
  };

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
        {/* <div className="grid sm:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-4">
          {[
            getImageColumn(0),
            getImageColumn(1),
            getImageColumn(2),
            getImageColumn(3),
          ].map((column, index) => (
            <div className="flex flex-col gap-4" key={index}>
              {column.map((result) => (
                <CloudinaryImage
                  key={result.public_id}
                  src={result.public_id}
                  width="400"
                  height="300"
                  alt="Her skulle være et sejt IQ billede"
                />
              ))}
            </div>
          ))}
        </div> */}
      </div>
    </PageLayout>
  );
};

export default GalleryPage;
