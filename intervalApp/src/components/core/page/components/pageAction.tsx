import { ReactNode } from "react";

import { Box } from "@Interval/components/core/box";

type PageButtonProps = {
    pageAction?: ReactNode;
};

export const PageAction = ({ pageAction }: PageButtonProps) => {
    return (
        <Box className="page-action">
            <Box className="page-action-button">{pageAction}</Box>

            <Box className="page-action-circle-cut-off" />
        </Box>
    );
};
