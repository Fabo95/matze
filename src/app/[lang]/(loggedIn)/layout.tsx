import React from 'react';
import { Manrope } from 'next/font/google';
import { Metadata } from 'next';

import 'styles/global.css';
import { Menu } from 'ui/menu/menu';
import { getTFunction } from 'i18n/get-t-function';
import { Locale, Page } from 'utils/types';
import { Box } from 'common/box';

const manrope = Manrope({
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  description: 'Interval timer for your workout.',
  title: 'Interval Timer',
  // TODO Remove viewport property from metadata.
  viewport: {
    initialScale: 0.7,
    maximumScale: 0.7,
    width: 'device-width',
  },
};

const RootLayout = async ({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { [key: string]: Locale };
}) => {
  const t = await getTFunction(lang);

  // --- HELPERS ˛

  const menuOptions = [
    { page: Page.HOME, translation: t('pages.home.menuOption') },
    { page: Page.SETTINGS, translation: t('pages.settings.menuOption') },
    { page: Page.HISTORY, translation: t('pages.history.menuOption') },
    { page: Page.STATISTICS, translation: t('pages.statistics.menuOption') },
  ];

  // --- RENDER ---

  return (
    <html className={manrope.className} lang={lang}>
      <body>
        <Box className="root-layout">
          <Menu headline={t(`pages.home.headline`)} menuOptions={menuOptions} />
          {children}
        </Box>
      </body>
    </html>
  );
};

export default RootLayout;
