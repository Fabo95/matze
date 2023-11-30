import { useMemo } from "react";

import { Page } from "@Interval/components/core/page/page";
import { Skeleton } from "@Interval/components/core/skeleton";

const Loading = () => {
    // --- MEMOIZED DATA ---

    const pageBlockStart = useMemo(() => <Skeleton className="chat-page-loading-block-start" />, []);

    const pageBlockEnd = useMemo(() => <Skeleton className="chat-page-loading-block-end" />, []);

    // --- RENDER ---

    return <Page blockEnd={pageBlockEnd} blockStart={pageBlockStart} />;
};

export default Loading;
