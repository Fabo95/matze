'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { Message } from 'blocks/chat/utils/chatMessageTypes';

type ChatConversationProps = {
  authToken: RequestCookie | undefined;
  userId: number | undefined;
};

const ChatConversation1 = ({ authToken, userId }: ChatConversationProps) => {
  // --- STATE ---
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const socket = useRef<WebSocket | null>(null);

  // --- EFFECTS ---

  useEffect(() => {
    if (!socket.current) {
      socket.current = new WebSocket('ws://localhost:8081');

      socket.current.onopen = () => {
        socket.current?.send(
          JSON.stringify({
            jwt: `Bearer ${authToken?.value}`,
            sender_id: userId,
            type: 'identification',
          })
        );
      };

      socket.current.onmessage = ({ data }) => {
        const message = JSON.parse(data);

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            content: message.content,
            isMessageSaved: message.is_saved,
            senderId: message.sender_id,
          },
        ]);
      };

      socket.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }

    return () => {
      socket.current?.close();
      socket.current = null;
    };
  }, [authToken?.value, userId]);

  // --- CALLBACKS ---

  const sendMessage = useCallback(() => {
    if (socket.current && currentMessage.trim() !== '') {
      socket.current.send(
        JSON.stringify({
          content: currentMessage,
          jwt: `Bearer ${authToken?.value}`,
          // TODO Use real id
          receiver_id: 2,
          sender_id: userId,
          type: 'notification',
        })
      );

      setMessages((prevMessages) => [
        ...prevMessages,
        { content: currentMessage, isMessageSaved: true, senderId: userId },
      ]);
      setCurrentMessage('');
    }
  }, [authToken?.value, currentMessage, userId]);

  // --- RENDER ---

  return (
    <div>
      <div
        style={{ border: '1px solid #ccc', height: '300px', overflowY: 'auto' }}
      >
        {messages.map((message, index) => (
          <div key={index}>
            <div
              style={{
                display: 'flex',
                justifyContent: message.senderId === userId ? 'start' : 'end',
              }}
            >
              <strong>{message.senderId}:</strong> {message.content}
            </div>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatConversation1;
