import { useCallback, useState } from "react";

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

import { Friendship, Message } from "@Interval/api/utils/apiTypes";
import { ChatMessageForm } from "@Interval/blocks/chat/components/chatMessages/components/chatMessageForm";
import { getInitialMessages } from "@Interval/blocks/chat/components/chatMessages/utils/chatMessagesHelpers";
import { useWebSocket } from "@Interval/blocks/chat/components/chatMessages/utils/chatMessagesHooks";
import { Box } from "@Interval/components/core/box";
import { getFriend } from "@Interval/blocks/utils/blocksHelpers";
import { ChatMessages } from "@Interval/blocks/chat/components/chatMessages/components/chatMessages/chatMessages";
import { ChatSlidingPaneHeader } from "@Interval/blocks/chat/components/chatMessages/components/chatSlidingPaneHeader";

type ChatSlidingPaneProps = {
    authToken?: RequestCookie;
    handleCloseChat: () => void;
    selectedFriendship: Friendship;
    userId: number;
};

export const ChatSlidingPane = ({ authToken, handleCloseChat, selectedFriendship, userId }: ChatSlidingPaneProps) => {
    // --- STATE ---

    const [messages, setMessages] = useState(() => getInitialMessages(selectedFriendship));

    // --- HELPERS ---

    const friend = getFriend({
        userId,
        friendship: selectedFriendship,
    });

    // --- CALLBACKS ---

    const handleSetMessages = useCallback((message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    }, []);

    const { sendMessage } = useWebSocket({
        authToken,
        handleSetMessages,
        userId,
    });

    // --- RENDER ---

    return (
        <Box className={`chat-messages-sliding-pane ${selectedFriendship && "chat-messages-sliding-pane-open"}`}>
            <ChatSlidingPaneHeader friend={friend} handleCloseChat={handleCloseChat} />

            <ChatMessages messages={messages} userId={userId} />

            <ChatMessageForm
                friendshipId={selectedFriendship.friendshipId}
                receiverUserId={friend.userId}
                sendMessage={sendMessage}
            />
        </Box>
    );
};
