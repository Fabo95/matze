'use client';

import { useCallback, useState } from 'react';

import { FriendshipMessages, User } from 'api/utils/apiTypes';
import { ChatFriendshipCard } from 'components/blocks/chat/components/chatFriendships/chatFriendshipCard/chatFriendshipCard';
import { PageBlockStart } from 'components/core/page/components/pageBlockStart';
import { PageBlockEnd } from 'components/core/page/components/pageBlockEnd';
import { getTFunction } from 'i18n/tFunction';
import { Locale } from 'utils/types';
import { ChatMessages } from 'components/blocks/chat/components/chatMessages/chatMessages';
import { useBoolean } from 'utils/hooks';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

type ChatBlockProps = {
  authToken?: RequestCookie;
  friendshipsMessages: FriendshipMessages[];
  user: User;
};

export const ChatBlock = ({
  authToken,
  friendshipsMessages,
  user,
}: ChatBlockProps) => {
  const t = getTFunction(Locale.DE);

  // --- STATE ---

  const [selectedFriendshipMessages, setSelectedFriendshipMessages] =
    useState<FriendshipMessages>();

  const {
    toggle: toggleChatMessages,
    value: isChatMessagesShown,
    setTrue: openChatMessages,
    setFalse: closeChatMessages,
  } = useBoolean(false);

  // --- CALLBACKS ---

  const handleSelectFriendshipMessages = useCallback(
    (friendshipMessages: FriendshipMessages) => {
      setSelectedFriendshipMessages(friendshipMessages);

      openChatMessages();
    },
    [openChatMessages]
  );

  // --- RENDER ---

  return (
    <>
      {selectedFriendshipMessages && isChatMessagesShown && (
        <ChatMessages
          authToken={authToken}
          isChatMessagesShown={isChatMessagesShown}
          selectedFriendshipMessages={selectedFriendshipMessages}
          userId={user.userId}
        />
      )}

      <PageBlockStart className="chat-headline">
        {t('pages.chat.headline')}
      </PageBlockStart>

      <PageBlockEnd className="chat-friendships">
        {friendshipsMessages.map((friendshipMessages) => (
          <ChatFriendshipCard
            friendshipMessages={friendshipMessages}
            handleSelectFriendshipMessages={handleSelectFriendshipMessages}
            key={friendshipMessages.friendshipId}
            userId={user.userId}
          />
        ))}
      </PageBlockEnd>
    </>
  );
};
