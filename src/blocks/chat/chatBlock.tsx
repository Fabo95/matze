'use client';

import { useCallback, useState } from 'react';

import { FriendshipMessages } from 'api/utils/apiTypes';
import { Box } from 'core/box';
import { ChatFriendshipCard } from 'blocks/chat/components/chatFriendships/chatFriendshipCard/chatFriendshipCard';
import { PageBlockStart } from 'core/page/components/pageBlockStart';
import { PageBlockEnd } from 'core/page/components/pageBlockEnd';
import { getTFunction } from 'i18n/tFunction';
import { Locale } from 'utils/types';
import { ChatMessages } from 'blocks/chat/components/chatMessages/chatMessages';
import { useBoolean } from 'utils/hooks';

type ChatBlockProps = {
  friendshipsMessages: FriendshipMessages[];
};

export const ChatBlock = ({ friendshipsMessages }: ChatBlockProps) => {
  const t = getTFunction(Locale.DE);

  // --- STATE ---

  const [selectedFriendshipMessages, setSelectedFriendshipMessages] =
    useState<FriendshipMessages>();

  const {
    toggle: toggleChatMessages,
    value: isChatMessagesShown,
    setTrue: openChatMessages,
    setFalse: closeChatMessages,
  } = useBoolean(true);

  // --- CALLBACKS ---

  const handleSelectFriendshipMessages = useCallback(
    (friendshipMessages: FriendshipMessages) => {
      setSelectedFriendshipMessages(friendshipMessages);

      openChatMessages();
    },
    [openChatMessages]
  );

  // --- RENDER ---

  console.log('selectedFriendshipMessages', selectedFriendshipMessages);

  return (
    <>
      <ChatMessages isChatMessagesShown={isChatMessagesShown}>
        HIIIIII
      </ChatMessages>

      <PageBlockStart className="chat-messages-headline">
        {t('pages.chat.headline')}
      </PageBlockStart>

      <PageBlockEnd className="chat-messages-container ">
        <Box className="chat-messages-cards">
          {friendshipsMessages.map((friendshipMessages, index) => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <ChatFriendshipCard
              friendshipMessages={friendshipMessages}
              handleSelectFriendshipMessages={handleSelectFriendshipMessages}
              key={index}
            />
          ))}
        </Box>
      </PageBlockEnd>
    </>
  );
};
