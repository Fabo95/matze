import React from 'react';

import 'styles/global.css';
import { Menu } from 'ui/menu/menu';
import { getTFunction } from 'i18n/tFunction';
import { Locale, Page } from 'utils/types';
import { Box } from 'common/box';

const LoggedInLayout = async ({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { [key: string]: Locale };
}) => {
  const t = await getTFunction(lang);

  // --- HELPERS ˛

  const menuOptions: {
    page: Exclude<Page, Page.LOGIN | Page.REGISTER>;
    translation: string;
  }[] = [
    { page: Page.HOME, translation: t('pages.home.menuOption') },
    { page: Page.SETTINGS, translation: t('pages.settings.menuOption') },
    { page: Page.HISTORY, translation: t('pages.history.menuOption') },
    { page: Page.STATISTICS, translation: t('pages.statistics.menuOption') },
  ];

  // --- RENDER ---

  return (
    <Box className="root-layout">
      <Menu headline={t(`pages.home.headline`)} menuOptions={menuOptions} />
      {children}
    </Box>
  );
};

export default LoggedInLayout;
