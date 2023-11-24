import React, { ReactNode } from 'react';

import { Box } from 'components/core/box';

type PageProps = {
  children: ReactNode;
  className?: string;
};

export const Page = ({ children, className: propsClassName }: PageProps) => {
  // --- HELPERS ---

  const className = propsClassName ? `page ${propsClassName}` : 'page';

  // --- RENDER ---

  return <Box className={className}>{children}</Box>;
};
