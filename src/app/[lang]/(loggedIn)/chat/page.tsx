import React from 'react';
import { cookies } from 'next/headers';

import ChatMessage from 'ui/chat/chatMessage';
import { apiGetUser } from 'api/api';

const Chat = async () => {
  // --- STATE ---

  const user = await apiGetUser();

  const authToken = cookies().get('authToken');

  // --- RENDER ---

  return <ChatMessage authToken={authToken} userId={user.userId} />;
};

export default Chat;
