'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

type ChatMessageProps = { authToken: RequestCookie | undefined };

const ChatMessage = ({ authToken }: ChatMessageProps) => {
  // --- STATE ---
  const [messages, setMessages] = useState<
    { content: string; sender: string }[]
  >([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const socket = useRef<WebSocket | null>(null);

  console.log('authToken', authToken);

  // --- EFFECTS ---

  useEffect(() => {
    if (!socket.current && 'WebSocket' in window) {
      socket.current = new WebSocket('ws://localhost:8081');

      socket.current.onopen = () => {
        console.log('WebSocket connection opened');
      };

      socket.current.onmessage = ({ data }) => {
        console.log('MESSAGE:', JSON.parse(data));

        const message = JSON.parse(data);

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            content: message.content,
            isMessageSaved: message.is_saved,
            sender: 'you',
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
  }, []);

  // --- CALLBACKS ---

  const sendMessage = useCallback(() => {
    if (socket.current && currentMessage.trim() !== '') {
      socket.current.send(
        JSON.stringify({
          content: currentMessage,
          jwt: `Bearer ${authToken?.value}`,
          // TODO Use real id
          receiver_id: 1,
          // TODO Use real id
          sender_id: 2,
        })
      );

      setMessages((prevMessages) => [
        ...prevMessages,
        { content: currentMessage, sender: 'me' },
      ]);
      setCurrentMessage('');
    }
  }, [authToken?.value, currentMessage]);

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
                justifyContent: message.sender === 'me' ? 'start' : 'end',
              }}
            >
              <strong>{message.sender}:</strong> {message.content}
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

export default ChatMessage;
