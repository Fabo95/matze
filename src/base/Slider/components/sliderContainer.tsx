import { ReactElement } from 'react';

import { Box } from 'base/box';

type SliderContainerProps = { children: ReactElement };
export const SliderContainer = ({ children }: SliderContainerProps) => (
  <Box className="position-relative height-full margin-bottom-6 align-items-center">
    {children}
  </Box>
);
