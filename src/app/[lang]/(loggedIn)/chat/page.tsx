import React from 'react';

import { apiGetFriendshipsMessages, apiGetUserByIdOrFromToken } from 'api/api';
import { ChatBlock } from 'components/blocks/chat/chatBlock';
import { Page } from 'components/core/page/page';
import { cookies } from 'next/headers';

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
