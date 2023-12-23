import { cookies } from "next/headers";

import { ChatBlock } from "@Interval/blocks/chat/chatBlock";
import { apiGetFriendships, apiGetUserByIdOrFromToken } from "@Interval/api/api";
import { Friendship } from "@Interval/api/utils/apiTypes";

let externalResolve: (friendship?: Friendship) => void;

type ChatProps = { searchParams: { friendshipId?: number } };

const Chat = async ({ searchParams }: ChatProps) => {
    // --- DATA ---

    const authToken = cookies().get("authToken");

    const pendingUser = apiGetUserByIdOrFromToken();
    const pendingSelectedFriendship = new Promise<Friendship | undefined>((resolve) => {
        // We save the resolve function in the external variable to enable setting of the selectedFriendship as soon the fetch to all friendships resolves.
        externalResolve = resolve;
    });
    const pendingFriendships = apiGetFriendships().then((friendships) => {
        setSelectedFriendshipFromSearchParams(friendships);

        return friendships;
    });

    // --- CALLBACKS ---

    const setSelectedFriendshipFromSearchParams = (friendships: Friendship[]) => {
        const { friendshipId } = searchParams;

        const currentFriendship = friendships.find((friendship) => friendship.friendshipId === Number(friendshipId));

        externalResolve(currentFriendship);
    };

    // Parallel data fetching
    // See: https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#parallel-data-fetching
    const [user, friendships, selectedFriendship] = await Promise.all([
        pendingUser,
        pendingFriendships,
        pendingSelectedFriendship,
    ]);

    // --- RENDER ---

    return (
        <ChatBlock
            authToken={authToken}
            friendships={friendships}
            selectedFriendship={selectedFriendship}
            user={user}
        />
    );
};

export default Chat;
