import '@styles/globals.css';

import HeaderNav from '@components/layout/HeaderNavBar';
import {ReactNode} from 'react';
import BottomNav from '@components/layout/BottomNav';

export const metadata = {
  title: 'IQ96 web app',
  description: 'IQ96 web app',
};

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
        <BottomNav value={0} />
      </main>
    </body>
  </html>
);

export default RootLayout;
