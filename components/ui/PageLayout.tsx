import { ReactNode } from 'react';

import BottomSpacer from './BottomSpacer';
import HeaderNavbar from './HeaderNavBar';

interface Props {
  children: ReactNode;
}

const PageLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative mx-auto flex flex-grow flex-col">
      <HeaderNavbar />
      {children}
      <BottomSpacer />
    </div>
  );
};

export default PageLayout;
