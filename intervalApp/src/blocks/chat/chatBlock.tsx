"use client";

import { useCallback, useMemo, useState } from "react";

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

import { FriendshipMessages, User } from "@Interval/api/utils/apiTypes";
import { ChatFriendshipCard } from "@Interval/blocks/chat/components/chatFriendships/chatFriendshipCard/chatFriendshipCard";
import { ChatMessages } from "@Interval/blocks/chat/components/chatMessages/chatMessages";
import { getTFunction } from "@Interval/i18n/tFunction";
import { useBoolean } from "@Interval/utils/hooks";
import { Locale } from "@Interval/utils/types";
import { Page } from "@Interval/components/core/page/page";
import { Box } from "@Interval/components/core/box";
import { Text } from "@Interval/components/core/text";

type ChatBlockProps = {
    authToken?: RequestCookie;
    friendshipsMessages: FriendshipMessages[];
    user: User;
};

export const ChatBlock = ({ authToken, friendshipsMessages, user }: ChatBlockProps) => {
    const t = getTFunction(Locale.DE);

    // --- STATE ---

    const [selectedFriendshipMessages, setSelectedFriendshipMessages] = useState<FriendshipMessages>();

    const { setTrue: openChatMessages, value: isChatMessagesShown } = useBoolean(false);

    // --- CALLBACKS ---

    const handleSelectFriendshipMessages = useCallback(
        (friendshipMessages: FriendshipMessages) => {
            setSelectedFriendshipMessages(friendshipMessages);

            openChatMessages();
        },
        [openChatMessages]
    );

    // --- MEMOIZED DATA ---

    const pageBlockStart = useMemo(() => <Text className="chat-headline">{t("pages.chat.headline")}</Text>, [t]);

    const pageBlockEnd = useMemo(
        () => (
            <Box className="chat-friendships">
                {friendshipsMessages.map((friendshipMessages) => (
                    <ChatFriendshipCard
                        friendshipMessages={friendshipMessages}
                        handleSelectFriendshipMessages={handleSelectFriendshipMessages}
                        key={friendshipMessages.friendshipId}
                        userId={user.userId}
                    />
                ))}
            </Box>
        ),
        [friendshipsMessages, handleSelectFriendshipMessages, user.userId]
    );

    // --- RENDER ---

    return (
        <>
            {selectedFriendshipMessages && isChatMessagesShown && (
                <ChatMessages
                    authToken={authToken}
                    isChatMessagesShown={isChatMessagesShown}
                    selectedFriendshipMessages={selectedFriendshipMessages}
                    userId={user.userId}
                />
            )}

            <Page blockEnd={pageBlockEnd} blockStart={pageBlockStart} className="chat-page" />
        </>
    );
};
