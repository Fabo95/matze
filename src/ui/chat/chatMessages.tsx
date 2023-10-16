'use client';

import { FriendshipMessages } from 'api/utils/apiTypes';
import { Box } from 'common/box';
import { ChatMessageCard } from 'ui/chat/ChatMessageCard/chatMessageCard';
import { PageBlockStart } from 'common/Page/components/pageBlockStart';
import { PageBlockEnd } from 'common/Page/components/pageBlockEnd';

type ChatMessagesProps = {
  friendshipsMessages: FriendshipMessages[];
};

export const ChatMessages = ({ friendshipsMessages }: ChatMessagesProps) => {
  // --- RENDER ---

  return (
    <>
      <PageBlockStart>dsa</PageBlockStart>
      <PageBlockEnd className="chat-messages-container ">
        <Box className="chat-messages-cards">
          {friendshipsMessages.map((friendshipMessages, index) => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <ChatMessageCard
              friendshipMessages={friendshipMessages}
              key={index}
            />
          ))}
        </Box>
      </PageBlockEnd>
    </>
  );
};
