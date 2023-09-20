'use client';

import { CldUploadButton } from 'next-cloudinary';
import { usePathname, useRouter } from 'next/navigation';
import { Fragment, useEffect } from 'react';
import { MdCloudUpload } from 'react-icons/md';

import { handleStartTheme } from '@components/member/ThemeToggle';
import { SavingBadgeStatusToLocalStorage } from '@components/ui/BottomNav';
import { Button } from '@components/ui/button';

interface Props {
  folder?: string;
}

function getStringAfterLastSlash(inputString: string): string {
  const parts = inputString.split('/');
  return parts.pop() || '';
}

const UploadButton = ({ folder }: Props) => {
  const router = useRouter();
  const currentPage = usePathname();

  console.log('folder', folder);
  console.log('currentPage', currentPage);

  useEffect(() => {
    handleStartTheme();
    const folderParts = folder?.split('/');
    if (folderParts && folderParts?.length > 0) {
      console.log('folderParts', folderParts);
      if (folderParts[0] === 'letters') {
        const year = getStringAfterLastSlash(currentPage);
        SavingBadgeStatusToLocalStorage(`bib-brev-${year}`);
      } else {
        const year = folderParts[1]?.split('-')[0];
        SavingBadgeStatusToLocalStorage(`bib-gal-${folderParts[0]}-${year}`);
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
