'use client';

import { useCallback, useState } from 'react';

import { FriendshipMessages, User } from 'api/utils/apiTypes';
import { ChatFriendshipCard } from 'components/blocks/chat/components/chatFriendships/chatFriendshipCard/chatFriendshipCard';
import { ChatMessages } from 'components/blocks/chat/components/chatMessages/chatMessages';
import { PageBlockEnd } from 'components/core/page/components/pageBlockEnd';
import { PageBlockStart } from 'components/core/page/components/pageBlockStart';
import { getTFunction } from 'i18n/tFunction';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { useBoolean } from 'utils/hooks';
import { Locale } from 'utils/types';

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
