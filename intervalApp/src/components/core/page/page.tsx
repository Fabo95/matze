import { ReactNode } from "react";

import { Box } from "@Interval/components/core/box";
import { PageBlockStart } from "@Interval/components/core/page/components/pageBlockStart";
import { PageBlockEnd } from "@Interval/components/core/page/components/pageBlockEnd";
import { PageAction } from "@Interval/components/core/page/components/pageAction";

type PageProps = {
    blockEnd: ReactNode;
    blockStart: ReactNode;
    className?: string;
    pageAction?: ReactNode;
};

export const Page = ({ blockEnd, blockStart, className: propsClassName, pageAction }: PageProps) => {
    // --- HELPERS ---

    const className = propsClassName ? `page ${propsClassName}` : "page";

    // --- RENDER ---

    return (
        <Box className={className}>
            <PageBlockStart>{blockStart}</PageBlockStart>

            {pageAction && <PageAction pageAction={pageAction} />}

            <PageBlockEnd>{blockEnd}</PageBlockEnd>
        </Box>
    );
};
