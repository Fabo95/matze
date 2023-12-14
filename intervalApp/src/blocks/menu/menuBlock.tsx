"use client";

import { useEffect } from "react";

import { MenuHeader } from "@Interval/blocks/menu/components/menuHeader";
import { MenuSlidingPane } from "@Interval/blocks/menu/components/menuSlidingPane/menuSlidingPane";
import { BackgroundBlur } from "@Interval/components/core/backgroundBlur";
import { Box } from "@Interval/components/core/box";
import { usePathname, useRouter, useSearchParams } from "@Interval/utils/routing/routingHooks";
import { useBoolean } from "@Interval/utils/hooks";

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

            router.replace(pathname);
        }
    }, [pathname, router]);

    // --- RENDER ---

    return (
        <Box className={`menu ${isExecuting ? "menu-hidden" : ""}`}>
            <MenuHeader headline={headline} toggleMenu={toggleMenu} />

            <BackgroundBlur handleUnblur={closeMenu} isBlurred={isOpen} />

            <MenuSlidingPane headline={headline} isOpen={isOpen} />
        </Box>
    );
};
