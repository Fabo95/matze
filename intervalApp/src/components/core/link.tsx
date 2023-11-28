import { ReactNode } from "react";

import { UrlObject } from "url";
import NextLink from "next/link";

import { Locale } from "@Interval/utils/types";

type LinkProps = { children?: ReactNode; className: string; href: string | UrlObject; locale: Locale };
export const Link = ({ children, className, href, locale }: LinkProps) => (
    <NextLink className={className} href={`${locale}/${href}`}>
        {children}
    </NextLink>
);
