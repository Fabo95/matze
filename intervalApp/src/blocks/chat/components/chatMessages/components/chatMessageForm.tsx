import { ChangeEvent, useCallback, useState } from 'react';

import { SendMessage } from '@Interval/blocks/chat/components/chatMessages/utils/chatMessagesTypes';
import { Form } from '@Interval/components/core/form';
import { TextareaAutosize } from '@Interval/components/core/textareaAutosize';
import { UnstyledButton } from '@Interval/components/core/unstyledButton';
import { PaperAirplane } from '@Interval/components/icons/paperAirplane';

type ChatMessageFormProps = {
  friendshipId: number;
  receiverUserId: number;
  sendMessage: SendMessage;
};

export const ChatMessageForm = ({
  friendshipId,
  receiverUserId,
  sendMessage,
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
    [friendshipId, receiverUserId, sendMessage],
  );

  // --- RENDER ---

  return (
    <Form action={handleSubmitMessage} className="chat-message-form">
      <TextareaAutosize
        className="chat-message-form-input"
        maxRows={3}
        minRows={1}
        name="message"
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          setCurrentMessage(event.currentTarget.value)
        }
        value={currentMessage}
      />

      <UnstyledButton className="chat-message-form-submit" type="submit">
        <PaperAirplane className="chat-message-form-icon" />
      </UnstyledButton>
    </Form>
  );
};
