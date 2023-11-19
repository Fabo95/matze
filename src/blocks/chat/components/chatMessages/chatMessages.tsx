import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

import { ChatMessagesSlidingPane } from 'blocks/chat/components/chatMessages/components/chatMessagesSlidingPane';
import { FriendshipMessages, Message } from 'api/utils/apiTypes';
import { Box } from 'core/box';
import { Text } from 'core/text';
import { getFriend } from 'blocks/chat/utils/chatHelpers';
import { Row } from 'core/row';
import { Chevron } from 'icons/chevron';
import { UnstyledButton } from 'core/unstyledButton';
import { ChatMessage } from 'blocks/chat/components/chatMessages/components/chatMessage';
import { scrollToBottom } from 'utils/helpers';
import { getInitialMessages } from 'blocks/chat/components/chatMessages/utils/chatMessagesHelpers';
import { useWebSocket } from 'blocks/chat/components/chatMessages/utils/chatMessagesHooks';
import { ChatMessageForm } from 'blocks/chat/components/chatMessages/components/chatMessageForm';

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
    getInitialMessages(selectedFriendshipMessages)
  );

  // --- HELPERS ---

  const friend = getFriend({
    friendshipMessages: selectedFriendshipMessages,
    userId,
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
