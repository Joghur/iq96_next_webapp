import { Fragment, ReactNode } from 'react';

import SideMenu from '@components/ui/SideMenu';

interface Props {
  children: ReactNode;
}

export default function ImageGalleryLayout({ children }: Props) {
  return (
    <Fragment>
      <div className="border-b">
        <div className="container mx-auto ml-6 flex h-10 items-center px-4 sm:ml-20 sm:h-28">
          Gallery
        </div>
      </div>
      <div className="flex">
        <SideMenu />
        <div className="w-full px-4 py-2 pt-12"> {children}</div>
      </div>
    </Fragment>
  );
}
