import { ReactNode } from "react";

import { Box } from "@Interval/components/core/box";
import { PageBlockStart } from "@Interval/components/core/page/components/pageBlockStart";
import { PageBlockEnd } from "@Interval/components/core/page/components/pageBlockEnd";

type PageProps = {
    blockEnd?: ReactNode;
    blockStart?: ReactNode;
    className?: string;
};

export const Page = ({ blockEnd, blockStart, className: propsClassName }: PageProps) => {
    // --- HELPERS ---

    const className = propsClassName ? `page ${propsClassName}` : "page";

    // --- RENDER ---

    return (
        <Box className={className}>
            <PageBlockStart>{blockStart}</PageBlockStart>

            <PageBlockEnd>{blockEnd}</PageBlockEnd>
        </Box>
    );
};
