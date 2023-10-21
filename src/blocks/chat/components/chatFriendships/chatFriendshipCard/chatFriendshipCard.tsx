import { useMemo } from 'react';

import { FriendshipMessages } from 'api/utils/apiTypes';
import { Text } from 'core/text';
import { Row } from 'core/row';
import { formatDateAccordingToActuality } from 'utils/helpers';
import { UnstyledButton } from 'core/unstyledButton';
import { getFriend } from 'blocks/chat/utils/chatHelpers';

type ChatFriendshipCardProps = {
  handleSelectFriendshipMessages: (
    friendshipMessages: FriendshipMessages
  ) => void;
  friendshipMessages: FriendshipMessages;
  userId: number;
};
export const ChatFriendshipCard = ({
  handleSelectFriendshipMessages,
  friendshipMessages,
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
    <UnstyledButton
      className="chat-message-card"
      onClick={() => handleSelectFriendshipMessages(friendshipMessages)}
    >
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
    </UnstyledButton>
  );
};
