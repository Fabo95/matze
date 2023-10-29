import { useCallback, useEffect, useRef } from 'react';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { Message } from 'api/utils/apiTypes';

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

    socket.current = new WebSocket('ws://localhost:8081');

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
      // socket.current?.close();
      // socket.current = null;
    };
  }, [authToken?.value, handleSetMessages, userId]);

  // --- CALLBACKS ---

  const sendMessage = useCallback(
    ({
      currentMessage,
      friendshipId,
      receiverUserId,
    }: {
      currentMessage: string;
      friendshipId: number;
      receiverUserId: number;
    }) => {
      if (!socket.current || currentMessage.trim() === '') {
        return;
      }

      socket.current.send(
        JSON.stringify({
          content: currentMessage,
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

  // --- RENDER ---

  return { sendMessage };
};
