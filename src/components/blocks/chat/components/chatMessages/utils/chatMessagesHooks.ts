import { useCallback, useEffect, useRef } from 'react';

import { webSocketBaseUrl } from 'api/utils/apiConstants';
import { Message } from 'api/utils/apiTypes';
import { SendMessage } from 'components/blocks/chat/components/chatMessages/utils/chatMessagesTypes';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export const useWebSocket = ({
  userId,
  authToken,
  handleSetMessages,
}: {
  userId: number;
  authToken?: RequestCookie;
  handleSetMessages: (message: Message) => void;
}) => {
  // --- STATE ---

  const socket = useRef<WebSocket | null>(null);

  // --- EFFECTS ---

  useEffect(() => {
    if (!userId || !authToken?.value || socket.current) {
      return;
    }

    socket.current = new WebSocket(webSocketBaseUrl);

    socket.current.onopen = () => {
      socket.current?.send(
        JSON.stringify({
          jwt: `Bearer ${authToken?.value}`,
          sender_user_id: userId,
          type: 'identification',
        })
      );
    };

    socket.current.onmessage = ({ data }) => {
      const message = JSON.parse(data);

      handleSetMessages(message);
    };

    socket.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // eslint-disable-next-line consistent-return
    return () => {
      socket.current?.close();
      socket.current = null;
    };
  }, [authToken?.value, handleSetMessages, userId]);

  // --- CALLBACKS ---

  const sendMessage: SendMessage = useCallback(
    ({ message, friendshipId, receiverUserId }) => {
      if (!socket.current) {
        return;
      }

      socket.current.send(
        JSON.stringify({
          content: message,
          friendship_id: friendshipId,
          jwt: `Bearer ${authToken?.value}`,
          receiver_user_id: receiverUserId,
          sender_user_id: userId,
          type: 'notification',
        })
      );
    },
    [authToken?.value, userId]
  );

  // --- RETURN ---

  return { sendMessage };
};
