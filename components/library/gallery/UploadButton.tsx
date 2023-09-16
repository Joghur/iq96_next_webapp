'use client';

import { CldUploadButton } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect } from 'react';
import { MdCloudUpload } from 'react-icons/md';

import { Button } from '@components/ui/button';
import { handleStartTheme } from '@components/member/ThemeToggle';
import { SavingBadgeStatusToLocalStorage } from '@components/ui/BottomNav';

interface Props {
  folder?: string;
}

const UploadButton = ({ folder }: Props) => {
  const router = useRouter();

  useEffect(() => {
    handleStartTheme();
    const folderParts = folder?.split('/');
    if (folderParts && folderParts?.length > 0) {
      if (folderParts[0] === 'letters') {
        SavingBadgeStatusToLocalStorage(`bib-brev`);
      } else {
        SavingBadgeStatusToLocalStorage(
          `bib-gal-${folderParts[0]}-${folderParts[1].split('-')[0]}`
        );
      }
    }
  }, [folder]);

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
