import { useEffect, useRef } from "react";

import { Box } from "@Interval/components/core/box";
import { ChatMessage } from "@Interval/blocks/chat/components/chatMessages/components/chatMessages/components/chatMessage";
import { scrollToBottom } from "@Interval/utils/helpers";
import { Message } from "@Interval/api/utils/apiTypes";

let isFirstRender = true;

type ChatMessagesProps = { messages: Message[]; userId: number };

export const ChatMessages = ({ messages, userId }: ChatMessagesProps) => {
    // --- STATE ---

    const chatMessagesContainer = useRef<HTMLDivElement>(null);

    // --- EFFECTS ---

    useEffect(() => {
        if (isFirstRender) {
            scrollToBottom(chatMessagesContainer, "instant");

            isFirstRender = false;
            return;
        }

        if (messages.length > 0) {
            scrollToBottom(chatMessagesContainer, "smooth");
        }

        return () => {
            isFirstRender = true;
        };
    }, [messages.length]);

    // --- RENDER ---

    return (
        <Box className="chat-messages-content" ref={chatMessagesContainer}>
            {messages.map((message) => (
                <ChatMessage key={message.messageId} message={message} userId={userId} />
            ))}
        </Box>
    );
};
