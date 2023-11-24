import React from 'react';

import 'styles/global.css';
import { Box } from 'components/core/box';

const LoggedOutLayout = async ({ children }: { children: React.ReactNode }) => (
  <Box>{children}</Box>
);

export default LoggedOutLayout;
