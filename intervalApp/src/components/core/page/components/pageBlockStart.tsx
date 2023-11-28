import { ReactNode } from "react";

import { Section } from "@Interval/components/core/section";

type PageBlockStartProps = {
    children: ReactNode;
    className?: string;
};

export const PageBlockStart = ({ children, className: propsClassName }: PageBlockStartProps) => {
    // --- HELPERS ---

    const className = propsClassName ? `page-block-start ${propsClassName}` : "page-block-start";

    // --- RENDER ---

    return <Section className={className}>{children}</Section>;
};
