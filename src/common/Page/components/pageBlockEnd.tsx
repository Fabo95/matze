import React, { ReactNode } from 'react';

import { Box } from 'common/box';

type PageBlockEndProps = {
  children: ReactNode;
  className?: string;
};

export const PageBlockEnd = ({
  children,
  className: propsClassName,
}: PageBlockEndProps) => {
  // --- HELPERS ---

  const className = propsClassName
    ? `page-block-end ${propsClassName}`
    : 'page-block-end';

  // --- RENDER ---

  return <Box className={className}>{children}</Box>;
};
