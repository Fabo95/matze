import { ReactElement } from 'react';

import { Box } from 'base/box';

type SliderContainerProps = { children: ReactElement };
export const SliderContainer = ({ children }: SliderContainerProps) => (
  <Box className="relative h-full items-center">{children}</Box>
);
