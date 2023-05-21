import '@styles/globals.css';

import {ReactNode} from 'react';
import Head from 'next/head';

import BottomNav from '@components/layout/BottomNav';
import HeaderNav from '@components/layout/HeaderNavBar';
import {checkEnvironmentVariables} from '@utils/helpers.server';

interface Props {
  children: ReactNode;
}

export const metadata = {
  title: 'IQ96 web app',
  description: 'Web site created by IQ96',
  charset: 'utf-8',
};

const RootLayout = ({children}: Props) => {
  const error = checkEnvironmentVariables();
  if (error) throw error;

  return (
    <html lang="en">
      {/* <Head>
        <meta
          http-equiv="Access-Control-Allow-Origin"
          content="http://www.iq96.dk"
        />
      </Head> */}
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        {/* <HeaderNav /> */}
        <main className="app">{children}</main>
        {/* <BottomNav /> */}
      </body>
    </html>
  );
};

export default RootLayout;
