import { FriendshipMessages } from '@Interval/api/utils/apiTypes';

export const getInitialMessages = (
  selectedFriendshipMessages: FriendshipMessages,
) =>
  selectedFriendshipMessages.friendshipMessages.sort(
    (friendshipMessageA, friendshipMessageB) => {
      const timeA = new Date(friendshipMessageA.createdAt).getTime();
      const timeB = new Date(friendshipMessageB.createdAt).getTime();
      return timeA - timeB;
    },
  );
