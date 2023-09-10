import React from 'react';

import 'styles/global.css';
import { Menu } from 'ui/menu/menu';
import { getTFunction } from 'i18n/tFunction';
import { Locale } from 'utils/types';
import { Box } from 'common/box';

const LoggedInLayout = async ({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { [key: string]: Locale };
}) => {
  const t = await getTFunction(lang);

  // --- RENDER ---

  return (
    <Box className="root-layout">
      <Menu headline={t(`pages.home.headline`)} />
      {children}
    </Box>
  );
};

export default LoggedInLayout;
