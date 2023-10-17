import React from 'react';
import { cookies } from 'next/headers';

import { apiGetFriendshipsMessages } from 'api/api';
import { ChatMessages } from 'ui/chat/chatMessages';
import { Page } from 'common/Page/page';

const Chat = async () => {
  // --- STATE ---

  const friendshipsMessages = await apiGetFriendshipsMessages();

  const authToken = cookies().get('authToken');

  // --- RENDER ---

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
    <Page>
      <ChatMessages friendshipsMessages={friendshipsMessages} />
    </Page>
  );
};

export default Chat;
