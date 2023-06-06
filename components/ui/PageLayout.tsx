import { ReactNode } from "react";

import HeaderNavbar from "./HeaderNavBar";

interface Props {
  children: ReactNode;
}

const PageLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative mx-auto flex flex-grow flex-col">
      <HeaderNavbar />
      {children}
      <div className="h-40" />
    </div>
  );
};

export default PageLayout;
