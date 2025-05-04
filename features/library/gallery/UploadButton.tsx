'use client';

import { CldUploadButton } from 'next-cloudinary';
import { usePathname, useRouter } from 'next/navigation';
import { Fragment, useEffect } from 'react';
import { MdCloudUpload } from 'react-icons/md';

import { handleStartTheme } from '@features/member/ThemeToggle';
// eslint-disable-next-line prettier/prettier
import {
  NotificationDbType,
  SavingBadgeStatusToLocalStorage,
} from '@components/ui/BottomNav';
import { Button } from '@components/ui/button';
import { useFirestore } from '@lib/hooks/useFirestore';

interface Props {
  folder?: string;
}

const getStringAfterLastSlash = (inputString: string): string => {
  const parts = inputString.split('/');
  return parts.pop() || '';
};

const getBadgeString = (
  folder: string | undefined,
  currentPage: string
): string => {
  const folderParts = folder?.split('/');
  if (folderParts && folderParts?.length > 0) {
    if (folderParts[0] === 'letters') {
      const year = getStringAfterLastSlash(currentPage);
      return `bib-brev-${year}`;
    } else {
      const year = folderParts[1]?.split('-')[0];
      return `bib-gal-${folderParts[0]}-${year}`;
    }
  }
  return '';
};

const UploadButton = ({ folder }: Props) => {
  const router = useRouter();
  const currentPage = usePathname();

  const { addingDoc } = useFirestore<NotificationDbType>(
    'notification',
    'updatedAt'
  );

  useEffect(() => {
    handleStartTheme();
    const badgeString = getBadgeString(folder, currentPage);
    if (badgeString !== '') {
      SavingBadgeStatusToLocalStorage(badgeString);
    }
  }, [currentPage, folder]);

  const handleUpload = async () => {
    const badgeString = getBadgeString(folder, currentPage);
    await addingDoc(
      {
        updatedAt: new Date(),
      },
      badgeString
    );
    async () => {
      setTimeout(() => {
        router.refresh();
      }, 1000);
    };
  };

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
            onUpload={handleUpload}
          />
        </div>
      </Button>
    </Fragment>
  );
};

export default UploadButton;
