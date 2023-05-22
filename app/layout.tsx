import './globals.css';

import {ReactNode} from 'react';
import AuthContextProvider from '@/lib/store/auth-context';
import BottomNav from '@components/BottomNav';
import HeaderNavbar from '@components/HeaderNavBar';

export const revalidate = false;

interface Props {
  children: ReactNode;
}

export default function RootLayout({children}: Props) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <AuthContextProvider>
          <HeaderNavbar />
          {children}
          <BottomNav />
        </AuthContextProvider>
      </body>
    </html>
  );
}
