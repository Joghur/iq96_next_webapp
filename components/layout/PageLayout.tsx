import { ReactNode } from 'react';
import HeaderNavbar from './HeaderNavBar';

interface Props {
  children: ReactNode;
}

const PageLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative flex flex-col flex-grow px-6 mx-auto">
      <HeaderNavbar />
      {children}
      <div className="h-40" />
    </div>
  );
};

export default PageLayout;
