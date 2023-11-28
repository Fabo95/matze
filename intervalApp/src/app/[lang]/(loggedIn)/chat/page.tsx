import { cookies } from "next/headers";

import { ChatBlock } from "@Interval/blocks/chat/chatBlock";
import { Page } from "@Interval/components/core/page/page";
import { apiGetFriendshipsMessages, apiGetUserByIdOrFromToken } from "@Interval/api/api";

const Chat = async () => {
    // --- STATE ---

    const user = await apiGetUserByIdOrFromToken();
    const friendshipsMessages = await apiGetFriendshipsMessages();

    const authToken = cookies().get("authToken");

    // --- RENDER ---

    return (
        <Page className="chat-page">
            <ChatBlock authToken={authToken} friendshipsMessages={friendshipsMessages} user={user} />
        </Page>
    );
};

export default Chat;
