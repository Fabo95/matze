import React from 'react';

import 'styles/global.css';
import { Box } from 'common/box';

const LoggedOutLayout = async ({ children }: { children: React.ReactNode }) => (
  <Box>{children}</Box>
);

export default LoggedOutLayout;
