import { useCallback, useEffect, useRef, useState } from 'react';

import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

import { FriendshipMessages, Message } from '@Interval/api/utils/apiTypes';
import { ChatMessage } from '@Interval/blocks/chat/components/chatMessages/components/chatMessage';
import { ChatMessageForm } from '@Interval/blocks/chat/components/chatMessages/components/chatMessageForm';
import { ChatMessagesSlidingPane } from '@Interval/blocks/chat/components/chatMessages/components/chatMessagesSlidingPane';
import { getInitialMessages } from '@Interval/blocks/chat/components/chatMessages/utils/chatMessagesHelpers';
import { useWebSocket } from '@Interval/blocks/chat/components/chatMessages/utils/chatMessagesHooks';
import { Box } from '@Interval/components/core/box';
import { Row } from '@Interval/components/core/row';
import { Text } from '@Interval/components/core/text';
import { UnstyledButton } from '@Interval/components/core/unstyledButton';
import { Chevron } from '@Interval/components/icons/chevron';
import { scrollToBottom } from '@Interval/utils/helpers';
import { getFriend } from '@Interval/blocks/utils/blocksHelpers';

type ChatMessagesProps = {
  authToken?: RequestCookie;
  isChatMessagesShown: boolean;
  selectedFriendshipMessages: FriendshipMessages;
  userId: number;
};

let isFirstRender = true;

export const ChatMessages = ({
  authToken,
  isChatMessagesShown,
  selectedFriendshipMessages,
  userId,
}: ChatMessagesProps) => {
  // --- STATE ---

  const chatMessagesContainer = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState(() =>
    getInitialMessages(selectedFriendshipMessages),
  );

  // --- HELPERS ---

  const friend = getFriend({
    userId,
    friendshipMessages: selectedFriendshipMessages,
  });

  // --- CALLBACKS ---

  const handleSetMessages = useCallback((message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  const { sendMessage } = useWebSocket({
    authToken,
    handleSetMessages,
    userId,
  });

  // --- EFFECTS ---

  useEffect(() => {
    if (isFirstRender) {
      scrollToBottom(chatMessagesContainer, 'instant');

      isFirstRender = false;
      return;
    }

    if (messages.length > 0) {
      scrollToBottom(chatMessagesContainer, 'smooth');
    }
  }, [messages.length]);

  // --- RENDER ---

  return (
    <ChatMessagesSlidingPane isOpen={isChatMessagesShown}>
      <Row className="chat-messages-nav-bar-top">
        <UnstyledButton className="chat-messages-nav-bar-top-chevron">
          <Chevron direction="left" />
        </UnstyledButton>
        <Text>{friend?.nickname || friend.email}</Text>
      </Row>

      <Box className="chat-messages-content" ref={chatMessagesContainer}>
        {messages.map((message) => (
          <ChatMessage
            key={message.messageId}
            message={message}
            userId={userId}
          />
        ))}
      </Box>

      <ChatMessageForm
        friendshipId={selectedFriendshipMessages.friendshipId}
        receiverUserId={friend.userId}
        sendMessage={sendMessage}
      />
    </ChatMessagesSlidingPane>
  );
};
