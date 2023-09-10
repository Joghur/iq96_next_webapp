'use client';

import { CldUploadButton } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import { MdCloudUpload } from 'react-icons/md';

import { Button } from '@components/ui/button';

interface Props {
  folder?: string;
}

const UploadButton = ({ folder }: Props) => {
  const router = useRouter();

  return (
    <Fragment>
      <Button asChild variant="default">
        <div className="flex gap-2 items-center">
          <MdCloudUpload />
          <CldUploadButton
            options={{
              folder: folder,
            }}
            uploadPreset="mihetffc"
            public-id={folder}
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
