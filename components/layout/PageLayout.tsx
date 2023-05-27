import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const PageLayout = ({ children }: Props) => {
  return <div className="flex flex-col px-6 mx-auto">{children}</div>;
};

export default PageLayout;
