import React, { ReactNode } from 'react';

import { Box } from 'common/box';

type PageBlockStartProps = {
  children: ReactNode;
  className?: string;
};

export const PageBlockStart = ({
  children,
  className: propsClassName,
}: PageBlockStartProps) => {
  // --- HELPERS ---

  const className = propsClassName
    ? `page-block-start ${propsClassName}`
    : 'page-block-start';

  // --- RENDER ---

  return <Box className={className}>{children}</Box>;
};
