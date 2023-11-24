import { Message } from 'api/utils/apiTypes';
import { Box } from 'components/core/box';
import { Text } from 'components/core/text';
import { formatDateToTime } from 'utils/helpers';

type ChatMessageProps = { message: Message; userId: number };

export const ChatMessage = ({ message, userId }: ChatMessageProps) => {
  // --- HELPERS ---

  const messageUpdatedAtTime = formatDateToTime(new Date(message.updatedAt));

  // --- RENDER ---

  return (
    <Box
      className={
        message.senderUserId === userId
          ? 'chat-message-content-self'
          : 'chat-message-content-other'
      }
    >
      <Text className="chat-message-content-text">{message.content}</Text>
      <Text className="chat-message-content-date">{messageUpdatedAtTime}</Text>
    </Box>
  );
};
