import './globals.css';

import {ReactNode} from 'react';
import AuthContextProvider from '@/lib/store/auth-context';
import BottomNav from '@components/BottomNav';
import HeaderNavbar from '@components/HeaderNavBar';
import {Metadata} from 'next';

export const revalidate = false;

interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'IQ96 web app',
  description: 'Web app created by IQ96',
};

export default function RootLayout({children}: Props) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <HeaderNavbar />
          {children}
          <BottomNav />
        </AuthContextProvider>
      </body>
    </html>
  );
}
