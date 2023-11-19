import React, { useCallback, useState } from 'react';

import { Form } from 'core/form';
import { Button } from 'core/button';
import { SendMessage } from 'blocks/chat/components/chatMessages/utils/chatMessagesTypes';
import { TextareaAutosize } from 'core/textareaAutosize';
import { UnstyledButton } from 'core/unstyledButton';
import { PaperAirplane } from 'icons/paperAirplane';

type ChatMessageFormProps = {
  friendshipId: number;
  sendMessage: SendMessage;
  receiverUserId: number;
};

export const ChatMessageForm = ({
  friendshipId,
  sendMessage,
  receiverUserId,
}: ChatMessageFormProps) => {
  // ---- STATE ---

  const [currentMessage, setCurrentMessage] = useState('');

  // --- CALLBACKS ---

  const handleSubmitMessage = useCallback(
    (formData: FormData) => {
      const message = formData.get('message');

      if (!message) {
        return;
      }

      sendMessage({
        friendshipId,
        message,
        receiverUserId,
      });

      setCurrentMessage('');
    },
    [friendshipId, receiverUserId, sendMessage]
  );

  // --- RENDER ---

  return (
    <Form action={handleSubmitMessage} className="chat-message-form">
      <TextareaAutosize
        className="chat-message-form-input"
        maxRows={3}
        minRows={1}
        name="message"
        value={currentMessage}
        onChange={(event) => setCurrentMessage(event.currentTarget.value)}
      />

      <UnstyledButton className="chat-message-form-submit" type="submit">
        <PaperAirplane className="chat-message-form-icon" />
      </UnstyledButton>
    </Form>
  );
};
