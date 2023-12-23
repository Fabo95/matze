"use client";

import { useCallback, useMemo, useState } from "react";

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

import { Friendship, User } from "@Interval/api/utils/apiTypes";
import { ChatFriendshipCard } from "@Interval/blocks/chat/components/chatFriendships/chatFriendshipCard/chatFriendshipCard";
import { ChatSlidingPane } from "@Interval/blocks/chat/components/chatMessages/chatSlidingPane";
import { useClientTranslation } from "@Interval/utils/hooks";
import { Page } from "@Interval/components/core/page/page";
import { Box } from "@Interval/components/core/box";
import { Text } from "@Interval/components/core/text";
import { createSearchParams, deleteSearchParams } from "@Interval/utils/routing/routingHelpers";
import { usePathname, useRouter, useSearchParams } from "@Interval/utils/routing/routingHooks";

type ChatBlockProps = {
    authToken?: RequestCookie;
    friendships: Friendship[];
    selectedFriendship?: Friendship;
    user: User;
};

export const ChatBlock = ({
    authToken,
    friendships,
    selectedFriendship: propsSelectedFriendship,
    user,
}: ChatBlockProps) => {
    const t = useClientTranslation();

    // --- STATE ---

    const [selectedFriendship, setSelectedFriendship] = useState<Friendship | undefined>(propsSelectedFriendship);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // --- CALLBACKS ---

    const handleOpenChat = useCallback(
        (friendship: Friendship) => {
            const searchParams = createSearchParams({ friendshipId: friendship.friendshipId });

            router.replace(`${pathname}?${searchParams}`);

            setSelectedFriendship(friendship);
        },
        [pathname, router]
    );

    const handleCloseChat = useCallback(() => {
        const newSearchParams = deleteSearchParams({ searchParams, keysToDelete: ["friendshipId"] });

        router.replace(newSearchParams ? `${pathname}?${newSearchParams}` : pathname);

        setSelectedFriendship(undefined);
    }, [pathname, router, searchParams]);

    // --- MEMOIZED DATA ---

    const pageBlockStart = useMemo(() => <Text className="chat-headline">{t("pages.chat.headline")}</Text>, [t]);

    const pageBlockEnd = useMemo(
        () => (
            <Box className="chat-friendships">
                {friendships.map((friendship) => (
                    <ChatFriendshipCard
                        friendship={friendship}
                        handleOpenChat={handleOpenChat}
                        key={friendship.friendshipId}
                        userId={user.userId}
                    />
                ))}
            </Box>
        ),
        [friendships, handleOpenChat, user.userId]
    );

    // --- RENDER ---

    return (
        <>
            {selectedFriendship && (
                <ChatSlidingPane
                    authToken={authToken}
                    handleCloseChat={handleCloseChat}
                    selectedFriendship={selectedFriendship}
                    userId={user.userId}
                />
            )}

            <Page blockEnd={pageBlockEnd} blockStart={pageBlockStart} className="chat-page" />
        </>
    );
};
