import { ReactNode } from 'react';

import { ChatMessagesSlidingPane } from 'blocks/chat/components/chatMessages/components/chatMessagesSlidingPane';

type ChatMessagesProps = { children: ReactNode; isChatMessagesShown: boolean };

export const ChatMessages = ({
  children,
  isChatMessagesShown,
}: ChatMessagesProps) => {
  // --- RENDER ---

  console.log('isChatMessagesShown', isChatMessagesShown);

  return (
    <ChatMessagesSlidingPane isOpen={isChatMessagesShown}>
      {children}
    </ChatMessagesSlidingPane>
  );
};
