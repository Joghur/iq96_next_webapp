import '@styles/globals.css';

import HeaderNav from '@components/layout/HeaderNavBar';
import {ReactNode} from 'react';

interface Props {
  children: ReactNode;
}

export const metadata = {
  title: 'IQ96 web app',
  description: 'Web site created by IQ96',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

const RootLayout = ({children}: Props) => (
  <html lang="en">
    <body>
      <div className="main">
        <div className="gradient" />
      </div>
      <main className="app">
        <HeaderNav />
        {children}
      </main>
    </body>
  </html>
);

export default RootLayout;
