import React from 'react';
import { Manrope } from 'next/font/google';
import { Metadata } from 'next';

import 'styles/global.css';
import { Locale } from 'utils/types';
import InitServiceWorker from 'serviceWorker/initServiceWorker';

const manrope = Manrope({
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-manro pe',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  description: 'Interval timer for your workout.',
  manifest: '/manifest.json',
  themeColor: '#ffffff',
  title: 'Interval Timer',
  viewport: {
    width: 'device-width',
  },
};

const RootLayout = ({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { [key: string]: Locale };
}) => (
  <html className={manrope.className} lang={lang}>
    <body>
      <InitServiceWorker />
      {children}
    </body>
  </html>
);

export default RootLayout;
