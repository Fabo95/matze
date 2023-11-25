import React from 'react';

import '@Interval/styles/global.css';
import { MenuBlock } from '@Interval/components/blocks/menu/menuBlock';
import { Box } from '@Interval/components/core/box';
import { getTFunction } from '@Interval/i18n/tFunction';

import { Locale } from '@Interval/utils/types';

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
