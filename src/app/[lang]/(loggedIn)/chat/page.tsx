import React from 'react';
import { cookies } from 'next/headers';

import ChatMessage from 'ui/chat/chatMessage';

const Chat = () => {
  const authToken = cookies().get('authToken');

  // --- RENDER ---

  return <ChatMessage authToken={authToken} />;
};

export default Chat;
