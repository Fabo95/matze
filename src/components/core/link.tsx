import React, { ReactNode } from 'react';
import NextLink from 'next/link';
import { UrlObject } from 'url';

import { Locale } from 'utils/types';

export const Link = ({
  href,
  locale,
  children,
}: {
  href: string | UrlObject;
  locale: Locale;
  children?: ReactNode;
}) => <NextLink href={`${locale}/${href}`}>{children}</NextLink>;
