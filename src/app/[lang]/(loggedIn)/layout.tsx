import React from 'react';

import 'styles/global.css';
import { MenuBlock } from 'blocks/menu/menuBlock';
import { getTFunction } from 'i18n/tFunction';
import { Locale } from 'utils/types';
import { Box } from 'core/box';

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
      <MenuBlock headline={t(`pages.home.headline`)} />
      {children}
    </Box>
  );
};

export default LoggedInLayout;
