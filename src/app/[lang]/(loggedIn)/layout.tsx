import React from 'react';

import 'styles/global.css';
import { MenuBlock } from 'components/blocks/menu/menuBlock';
import { Box } from 'components/core/box';
import { getTFunction } from 'i18n/tFunction';
import { Locale } from 'utils/types';

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
