'use client';

import { FriendshipMessages } from 'api/utils/apiTypes';
import { Box } from 'common/box';
import { ChatMessageCard } from 'ui/chat/ChatMessageCard/chatMessageCard';
import { PageBlockStart } from 'common/Page/components/pageBlockStart';
import { PageBlockEnd } from 'common/Page/components/pageBlockEnd';
import { useCallback, useState } from 'react';

type ChatMessagesProps = {
  friendshipsMessages: FriendshipMessages[];
};

export const ChatMessages = ({ friendshipsMessages }: ChatMessagesProps) => {
  // --- STATE ---

  const [selectedFriendshipMessages, setSelectedFriendshipMessages] =
    useState<FriendshipMessages>();

  // --- CALLBACKS ---

  const handleSelectFriendshipMessages = useCallback(
    (friendshipMessages: FriendshipMessages) => {
      setSelectedFriendshipMessages(friendshipMessages);
    },
    []
  );

  // --- RENDER ---

  console.log('selectedFriendshipMessages', selectedFriendshipMessages);

  return (
    <>
      <PageBlockStart>dsa</PageBlockStart>
      <PageBlockEnd className="chat-messages-container ">
        <Box className="chat-messages-cards">
          {friendshipsMessages.map((friendshipMessages, index) => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <ChatMessageCard
              handleSelectFriendshipMessages={handleSelectFriendshipMessages}
              friendshipMessages={friendshipMessages}
              key={index}
            />
          ))}
        </Box>
      </PageBlockEnd>
    </>
  );
};
