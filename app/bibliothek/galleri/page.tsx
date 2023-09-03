'use client';

import { CldUploadButton } from 'next-cloudinary';
import { MdCloudUpload } from 'react-icons/md';

import { Button } from '@components/ui/button';
import PageLayout from '@components/ui/PageLayout';

const GalleryPage = () => {
  return (
    <PageLayout>
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Galleri</h1>
        <Button asChild variant="default">
          <div className="flex gap-2">
            <MdCloudUpload />
            <CldUploadButton
              uploadPreset="mihetffc"
              // onUpload={(result: any) => setImageId(result.info.public_id)}
            />
          </div>
        </Button>
      </div>
    </PageLayout>
  );
};

export default GalleryPage;
