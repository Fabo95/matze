import { ReactNode } from 'react';

import { Box } from 'core/box';

type ChatMessagesSlidingPaneProps = { children: ReactNode; isOpen: boolean };

export const ChatMessagesSlidingPane = ({
  children,
  isOpen,
}: ChatMessagesSlidingPaneProps) => (
  <Box
    className={`chat-messages-sliding-pane ${
      isOpen && 'chat-messages-sliding-pane-open'
    }`}
  >
    {children}
  </Box>
);
