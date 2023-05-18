import '@styles/globals.css';

import HeaderNav from '@components/layout/HeaderNavBar';
import {ReactNode} from 'react';
import BottomNav from '@components/layout/BottomNav';

interface Props {
  children: ReactNode;
}

const RootLayout = ({children}: Props) => (
  <html lang="en">
    <body>
      <div className="main">
        <div className="gradient" />
      </div>
      <main className="app">
        <HeaderNav />
        {children}
        <BottomNav />
      </main>
    </body>
  </html>
);

export default RootLayout;
