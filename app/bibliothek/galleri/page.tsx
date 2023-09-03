import cloudinary from 'cloudinary';

import CloudinaryImage from '@components/library/gallery/cloudinary-image';
import UploadButton from '@components/library/gallery/upload-button';
import PageLayout from '@components/ui/PageLayout';

type SearchResult = {
  public_id: string;
};

const GalleryPage = async () => {
  const result = (await cloudinary.v2.search
    .expression('resource_type:image')
    .sort_by('created_at', 'desc')
    .max_results(15)
    .execute()) as { resources: SearchResult[] };

  return (
    <PageLayout>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Galleri</h1>
          <UploadButton />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {result.resources.map((result) => (
            <CloudinaryImage
              key={result.public_id}
              src={result.public_id}
              width="400"
              height="300"
              alt="Her skulle være et sejt IQ billede"
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default GalleryPage;
