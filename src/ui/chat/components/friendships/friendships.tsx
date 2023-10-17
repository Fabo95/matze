'use client';

import { FriendshipMessages } from 'api/utils/apiTypes';
import { Box } from 'core/box';
import { FriendshipCard } from 'ui/chat/components/friendships/friendshipCard/friendshipCard';
import { PageBlockStart } from 'core/page/components/pageBlockStart';
import { PageBlockEnd } from 'core/page/components/pageBlockEnd';
import { useCallback, useState } from 'react';
import { getTFunction } from 'i18n/tFunction';
import { useParams } from 'next/navigation';
import { Locale } from 'utils/types';

type FriendshipsProps = {
  friendshipsMessages: FriendshipMessages[];
};

export const Friendships = ({ friendshipsMessages }: FriendshipsProps) => {
  const params = useParams<{ lang: Locale }>();

  const t = getTFunction(params.lang);

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
      <PageBlockStart className="chat-messages-headline">
        {t('pages.chat.headline')}
      </PageBlockStart>
      <PageBlockEnd className="chat-messages-container ">
        <Box className="chat-messages-cards">
          {friendshipsMessages.map((friendshipMessages, index) => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <FriendshipCard
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
