import { ReactElement } from 'react';

import { Box } from 'core/box';

type SliderContainerProps = { children: ReactElement };
export const SliderContainer = ({ children }: SliderContainerProps) => (
  <Box className="slider-container">{children}</Box>
);
