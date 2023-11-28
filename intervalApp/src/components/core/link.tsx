import { ReactNode } from "react";

import { UrlObject } from "url";
import NextLink from "next/link";

import { Locale } from "@Interval/utils/types";

export const Link = ({
    children,
    href,
    locale,
}: {
    children?: ReactNode;
    href: string | UrlObject;
    locale: Locale;
}) => <NextLink href={`${locale}/${href}`}>{children}</NextLink>;
