import React from 'react';
import { cookies } from 'next/headers';

import { apiGetFriendshipsMessages, apiGetUserByIdOrFromToken } from 'api/api';
import { Page } from 'core/page/page';
import { ChatBlock } from 'blocks/chat/chatBlock';

const Chat = async () => {
  // --- STATE ---

  const user = await apiGetUserByIdOrFromToken();
  const friendshipsMessages = await apiGetFriendshipsMessages();

  const authToken = cookies().get('authToken');

  // --- RENDER ---

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
    <Page className="chat-page">
      <ChatBlock
        authToken={authToken}
        friendshipsMessages={friendshipsMessages}
        user={user}
      />
    </Page>
  );
};

export default Chat;
