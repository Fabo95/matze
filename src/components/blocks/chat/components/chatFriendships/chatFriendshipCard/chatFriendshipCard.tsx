import { useMemo } from 'react';

import { FriendshipMessages } from 'api/utils/apiTypes';
import { getFriend } from 'components/blocks/chat/utils/chatHelpers';
import { Row } from 'components/core/row';
import { Text } from 'components/core/text';
import { UnstyledButton } from 'components/core/unstyledButton';
import {
  formatDateAccordingToActuality,
  getTruncatedText,
} from 'utils/helpers';

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
      className="chat-friendship-card"
      onClick={() => handleSelectFriendshipMessages(friendshipMessages)}
    >
      <Row className="chat-friendship-card-metadata">
        <Text className="chat-friendship-card-friend-name">{friendName}</Text>
        {latestMessageDate && (
          <Text className="chat-friendship-card-friend-date">
            {latestMessageDate}
          </Text>
        )}
      </Row>
      {latestMessage && (
        <Text className="chat-friendship-card-content">
          {getTruncatedText(latestMessage.content)}
        </Text>
      )}
    </UnstyledButton>
  );
};
