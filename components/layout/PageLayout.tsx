import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const PageLayout = ({ children }: Props) => {
  return (
    <div className="relative flex flex-col flex-grow px-6 mx-auto">
      {children}
      <div className="h-40" />
    </div>
  );
};

export default PageLayout;
