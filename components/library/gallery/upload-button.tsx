'use client';

import { CldUploadButton } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import { MdCloudUpload } from 'react-icons/md';

import { Button } from '@components/ui/button';

const UploadButton = () => {
  const router = useRouter();

  return (
    <Fragment>
      <Button asChild variant="default">
        <div className="flex gap-2 items-center">
          <MdCloudUpload />
          <CldUploadButton
            uploadPreset="mihetffc"
            onUpload={() => {
              setTimeout(() => {
                router.refresh();
              }, 1000);
            }}
          />
        </div>
      </Button>
    </Fragment>
  );
};

export default UploadButton;
