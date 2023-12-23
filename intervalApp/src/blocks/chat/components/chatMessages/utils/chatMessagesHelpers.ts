import { Friendship } from "@Interval/api/utils/apiTypes";

export const getInitialMessages = (selectedFriendship: Friendship) =>
    selectedFriendship.messages.sort((friendshipMessageA, friendshipMessageB) => {
        const timeA = new Date(friendshipMessageA.createdAt).getTime();
        const timeB = new Date(friendshipMessageB.createdAt).getTime();
        return timeA - timeB;
    });
