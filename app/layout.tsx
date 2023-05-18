import '@styles/globals.css';
import Head from 'next/head';

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
    <Head>
    <meta http-equiv="Access-Control-Allow-Origin" content="http://www.iq96.dk">
    </Head>
    <body>
      {/* <div className="main">
        <div className="gradient" />
      </div> */}
      <main className="app">{children}</main>
    </body>
  </html>
);

export default RootLayout;
