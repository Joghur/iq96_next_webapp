import './globals.css';
import 'leaflet/dist/leaflet.css';
import './leaflet-override.css';

import { Metadata } from 'next';
import { ReactNode } from 'react';

import AuthContextProvider from '@/lib/store/auth-context';
import BottomNav from '@components/ui/BottomNav';
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
        </AuthContextProvider>
      </body>
    </html>
  );
}
