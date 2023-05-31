import './globals.css';
import 'leaflet/dist/leaflet.css';
import './leaflet-override.css';

import { ReactNode } from 'react';
import { Metadata } from 'next';

import AuthContextProvider from '@/lib/store/auth-context';
import BottomNav from '@components/layout/BottomNav';
import CookieWarning from '@components/layout/CookieWarning';
// import SiteContextProvider from '@/lib/store/site-context';

export const revalidate = false;

interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'IQ96 web app',
  description: 'Web app created by IQ96',
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          {/* <SiteContextProvider> */}
          {children}
          <BottomNav />
          {/* </SiteContextProvider> */}
          <footer>
            <CookieWarning />
          </footer>
        </AuthContextProvider>
      </body>
    </html>
  );
}
