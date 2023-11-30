import { cookies } from "next/headers";

import { ChatBlock } from "@Interval/blocks/chat/chatBlock";
import { apiGetFriendshipsMessages, apiGetUserByIdOrFromToken } from "@Interval/api/api";

const Chat = async () => {
    // --- DATA ---

    const pendingUser = apiGetUserByIdOrFromToken();
    const pendingFriendshipsMessages = apiGetFriendshipsMessages();

    // Parallel data fetching
    // See: https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#parallel-data-fetching
    const [user, friendshipsMessages] = await Promise.all([pendingUser, pendingFriendshipsMessages]);

    const authToken = cookies().get("authToken");

    // --- RENDER ---

    return <ChatBlock authToken={authToken} friendshipsMessages={friendshipsMessages} user={user} />;
};

export default Chat;
