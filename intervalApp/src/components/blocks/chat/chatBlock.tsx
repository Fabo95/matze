'use client';

import { useCallback, useState } from 'react';

import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

import { FriendshipMessages, User } from '@Interval/api/utils/apiTypes';
import { ChatFriendshipCard } from '@Interval/components/blocks/chat/components/chatFriendships/chatFriendshipCard/chatFriendshipCard';
import { ChatMessages } from '@Interval/components/blocks/chat/components/chatMessages/chatMessages';
import { PageBlockEnd } from '@Interval/components/core/page/components/pageBlockEnd';
import { PageBlockStart } from '@Interval/components/core/page/components/pageBlockStart';
import { getTFunction } from '@Interval/i18n/tFunction';
import { useBoolean } from '@Interval/utils/hooks';
import { Locale } from '@Interval/utils/types';

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

  const { setTrue: openChatMessages, value: isChatMessagesShown } =
    useBoolean(false);

  // --- CALLBACKS ---

  const handleSelectFriendshipMessages = useCallback(
    (friendshipMessages: FriendshipMessages) => {
      setSelectedFriendshipMessages(friendshipMessages);

      openChatMessages();
    },
    [openChatMessages],
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
