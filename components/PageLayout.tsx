import { ReactNode } from 'react';
import HeaderNavbar from './HeaderNavBar';
import BottomSpacer from './BottomSpacer';

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
