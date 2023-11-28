import { ReactNode } from "react";

import { Section } from "@Interval/components/core/section";

type PageBlockEndProps = {
    children: ReactNode;
    className?: string;
};

export const PageBlockEnd = ({ children, className: propsClassName }: PageBlockEndProps) => {
    // --- HELPERS ---

    const className = propsClassName ? `page-block-end ${propsClassName}` : "page-block-end";

    // --- RENDER ---

    return <Section className={className}>{children}</Section>;
};
