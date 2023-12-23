import { useMemo } from "react";

import { Friendship } from "@Interval/api/utils/apiTypes";
import { Row } from "@Interval/components/core/row";
import { Text } from "@Interval/components/core/text";
import { UnstyledButton } from "@Interval/components/core/unstyledButton";
import { formatDateAccordingToActuality, getTruncatedText } from "@Interval/utils/helpers";
import { getFriend } from "@Interval/blocks/utils/blocksHelpers";

type ChatFriendshipCardProps = {
    friendship: Friendship;
    handleOpenChat: (friendship: Friendship) => void;
    userId: number;
};
export const ChatFriendshipCard = ({ friendship, handleOpenChat, userId }: ChatFriendshipCardProps) => {
    // ---- HELPERS ---

    const friend = getFriend({
        friendship,
        userId,
    });

    const friendName = friend.nickname || friend.email;

    // --- MEMOIZED DATA ---

    const latestMessage = useMemo(() => {
        if (friendship.messages.length === 0) {
            return undefined;
        }

        return friendship.messages.reduce((prevMessage, currentMessage) =>
            new Date(currentMessage.updatedAt) > new Date(prevMessage.updatedAt) ? currentMessage : prevMessage
        );
    }, [friendship.messages]);

    const latestMessageDate = useMemo(() => {
        if (!latestMessage) {
            return undefined;
        }

        return formatDateAccordingToActuality(new Date(latestMessage.updatedAt));
    }, [latestMessage]);

    // --- RENDER ---

    return (
        <UnstyledButton className="chat-friendship-card" onClick={() => handleOpenChat(friendship)}>
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
