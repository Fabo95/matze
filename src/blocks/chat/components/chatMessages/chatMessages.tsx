import { ChatMessagesSlidingPane } from 'blocks/chat/components/chatMessages/components/chatMessagesSlidingPane';
import { FriendshipMessages, User } from 'api/utils/apiTypes';
import { Box } from 'core/box';
import { Text } from 'core/text';
import { getFriend } from 'blocks/chat/utils/chatHelpers';

type ChatMessagesProps = {
  isChatMessagesShown: boolean;
  selectedFriendshipMessages: FriendshipMessages;
  userId: number;
};

export const ChatMessages = ({
  isChatMessagesShown,
  selectedFriendshipMessages,
  userId,
}: ChatMessagesProps) => {
  // --- HELPERS ---

  const friend = getFriend({
    friendshipMessages: selectedFriendshipMessages,
    userId,
  });

  // --- RENDER ---

  return (
    <ChatMessagesSlidingPane isOpen={isChatMessagesShown}>
      <Box>
        <Text>{friend?.nickname || friend.email}</Text>
      </Box>
    </ChatMessagesSlidingPane>
  );
};
