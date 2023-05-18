import '@styles/globals.css';

import HeaderNav from '@components/layout/HeaderNavBar';
import Head from 'next/head';
import {ReactNode} from 'react';
import BottomNav from '@components/layout/BottomNav';

export const metadata = {
  title: 'IQ96 web app',
  description: 'Web site created by IQ96',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
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
        <BottomNav />
      </main>
    </body>
  </html>
);

export default RootLayout;
