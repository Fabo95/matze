'use client';

import { FriendshipMessages } from 'api/utils/apiTypes';
import { Text } from 'common/text';
import { Box } from 'common/box';
import { Row } from 'common/row';
import { formatDateAccordingToActuality } from 'utils/helpers';
import { useMemo } from 'react';

type ChatMessageCardProps = {
  friendshipMessages: FriendshipMessages;
};
export const ChatMessageCard = ({
  friendshipMessages,
}: ChatMessageCardProps) => {
  // ---- HELPERS ---

  const friendName =
    friendshipMessages.userB?.nickname || friendshipMessages.userB?.email;

  // --- MEMOIZED DATA ---

  const latestMessage = useMemo(() => {
    if (friendshipMessages.friendshipMessages.length === 0) {
      return undefined;
    }

    return friendshipMessages.friendshipMessages.reduce(
      (prevMessage, currentMessage) =>
        new Date(currentMessage.updatedAt) > new Date(prevMessage.updatedAt)
          ? currentMessage
          : prevMessage
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
    <Box className="chat-message-card">
      <Row className="chat-message-card-metadata">
        <Text className="chat-message-card-friend-name">{friendName}</Text>
        {latestMessageDate && (
          <Text className="chat-message-card-friend-date">
            {latestMessageDate}
          </Text>
        )}
      </Row>
      {latestMessage && (
        <Text className="chat-message-card-content">
          {latestMessage.content}
        </Text>
      )}
    </Box>
  );
};
