"use client";

import { useEffect } from "react";

import { MenuHeader } from "@Interval/blocks/menu/components/menuHeader";
import { MenuSlidingPane } from "@Interval/blocks/menu/components/menuSlidingPane/menuSlidingPane";
import { BackgroundBlur } from "@Interval/components/core/backgroundBlur";
import { Box } from "@Interval/components/core/box";
import { usePathname, useRouter, useSearchParams } from "@Interval/utils/routing/routingHooks";
import { useBoolean } from "@Interval/utils/hooks";
import { deleteSearchParams } from "@Interval/utils/routing/routingHelpers";

let isFirstRender = true;
export const MenuBlock = ({ headline }: { headline: string }) => {
    // --- STATE ---

    const searchParams = useSearchParams();

    const isExecuting = searchParams.get("isExecuting");

    const router = useRouter();

    const pathname = usePathname();

    const { setFalse: closeMenu, toggle: toggleMenu, value: isOpen } = useBoolean(false);

    // --- EFFECTS ---

    useEffect(() => {
        if (isFirstRender) {
            isFirstRender = false;

            const newSearchParams = deleteSearchParams({ searchParams, keysToDelete: ["isExecuting"] });

            router.replace(newSearchParams ? `${pathname}?${newSearchParams}` : pathname);
        }
    }, [isExecuting, pathname, router, searchParams]);

    // --- RENDER ---

    return (
        <Box className={`menu ${isExecuting ? "menu-hidden" : ""}`}>
            <MenuHeader headline={headline} toggleMenu={toggleMenu} />

            <BackgroundBlur handleUnblur={closeMenu} isBlurred={isOpen} />

            <MenuSlidingPane headline={headline} isOpen={isOpen} />
        </Box>
    );
};
