import React from 'react';
import { cookies } from 'next/headers';

import { apiGetFriendshipsMessages } from 'api/api';
import { Friendships } from 'ui/chat/components/friendships/friendships';
import { Page } from 'core/page/page';

const Chat = async () => {
  // --- STATE ---

  const friendshipsMessages = await apiGetFriendshipsMessages();

  const authToken = cookies().get('authToken');

  // --- RENDER ---

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
    <Page>
      <Friendships friendshipsMessages={friendshipsMessages} />
    </Page>
  );
};

export default Chat;
