import { useMemo } from "react";

import { FriendshipMessages } from "@Interval/api/utils/apiTypes";
import { Row } from "@Interval/components/core/row";
import { Text } from "@Interval/components/core/text";
import { UnstyledButton } from "@Interval/components/core/unstyledButton";
import { formatDateAccordingToActuality, getTruncatedText } from "@Interval/utils/helpers";
import { getFriend } from "@Interval/blocks/utils/blocksHelpers";

type ChatFriendshipCardProps = {
    friendshipMessages: FriendshipMessages;
    handleSelectFriendshipMessages: (friendshipMessages: FriendshipMessages) => void;
    userId: number;
};
export const ChatFriendshipCard = ({
    friendshipMessages,
    handleSelectFriendshipMessages,
    userId,
}: ChatFriendshipCardProps) => {
    // ---- HELPERS ---

    const friend = getFriend({
        friendshipMessages,
        userId,
    });

    const friendName = friend.nickname || friend.email;

    // --- MEMOIZED DATA ---

    const latestMessage = useMemo(() => {
        if (friendshipMessages.friendshipMessages.length === 0) {
            return undefined;
        }

        return friendshipMessages.friendshipMessages.reduce((prevMessage, currentMessage) =>
            new Date(currentMessage.updatedAt) > new Date(prevMessage.updatedAt) ? currentMessage : prevMessage
        );
    }, [friendshipMessages.friendshipMessages]);

    const latestMessageDate = useMemo(() => {
        if (!latestMessage) {
            return undefined;
        }

        return formatDateAccordingToActuality(new Date(latestMessage.updatedAt));
    }, [latestMessage]);

    // --- RENDER ---

    return (
        <UnstyledButton
            className="chat-friendship-card"
            onClick={() => handleSelectFriendshipMessages(friendshipMessages)}
        >
            <Row className="chat-friendship-card-metadata">
                <Text className="chat-friendship-card-friend-name">{friendName}</Text>
                {latestMessageDate && <Text className="chat-friendship-card-friend-date">{latestMessageDate}</Text>}
            </Row>
            {latestMessage && (
                <Text className="chat-friendship-card-content">{getTruncatedText(latestMessage.content)}</Text>
            )}
        </UnstyledButton>
    );
};
