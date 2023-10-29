import { ChatMessagesSlidingPane } from 'blocks/chat/components/chatMessages/components/chatMessagesSlidingPane';
import { FriendshipMessages, Message } from 'api/utils/apiTypes';
import { Box } from 'core/box';
import { Text } from 'core/text';
import { getFriend } from 'blocks/chat/utils/chatHelpers';
import { Row } from 'core/row';
import { Chevron } from 'icons/chevron';
import { UnstyledButton } from 'core/unstyledButton';
import { ChatMessage } from 'blocks/chat/components/chatMessages/components/chatMessage/chatMessage';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { scrollToBottom } from 'utils/helpers';
import { getInitialMessages } from 'blocks/chat/components/chatMessages/utils/chatMessagesHelpers';
import { useWebSocket } from 'blocks/chat/components/chatMessages/utils/chatMessagesHooks';
import { Input } from 'core/input';
import { Form } from 'core/form';
import { Button } from 'core/button';

type ChatMessagesProps = {
  authToken?: RequestCookie;
  isChatMessagesShown: boolean;
  selectedFriendshipMessages: FriendshipMessages;
  userId: number;
};

export const ChatMessages = ({
  authToken,
  isChatMessagesShown,
  selectedFriendshipMessages,
  userId,
}: ChatMessagesProps) => {
  // --- STATE ---

  const chatMessagesContainer = useRef<HTMLDivElement>(null);

  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState(() =>
    getInitialMessages(selectedFriendshipMessages)
  );

  // --- CALLBACKS ---

  const handleSetMessages = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const { sendMessage } = useWebSocket({
    authToken,
    handleSetMessages,
    userId,
  });

  const handleSubmitMessage = useCallback(
    ({
      currentMessage,
      friendshipId,
      receiverUserId,
    }: {
      currentMessage: string;
      friendshipId: number;
      receiverUserId: number;
    }) => {
      sendMessage({
        currentMessage,
        friendshipId: selectedFriendshipMessages.friendshipId,
        receiverUserId: friend.userId,
      });

      setCurrentMessage('');
    },
    []
  );

  // --- HELPERS ---

  const friend = getFriend({
    friendshipMessages: selectedFriendshipMessages,
    userId,
  });

  const isLastMessageFromUser =
    messages[messages.length - 1].senderUserId === userId;

  // --- EFFECTS ---

  useEffect(() => {
    if (messages.length > 0 && isLastMessageFromUser) {
      scrollToBottom(chatMessagesContainer);
    }
  }, [isLastMessageFromUser, messages.length]);

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

      <Form
        action={(formData) => console.log('formData', formData.get('message'))}
      >
        <Input
          name="message"
          type="text"
          value={currentMessage}
          onChange={(event) => setCurrentMessage(event.currentTarget.value)}
        />

        <Button buttonTitle="submit" type="submit">
          Send
        </Button>
      </Form>
    </ChatMessagesSlidingPane>
  );
};
