import { FriendshipMessages } from 'api/utils/apiTypes';

export const getFriend = ({
  friendshipMessages,
  userId,
}: {
  friendshipMessages: FriendshipMessages;
  userId?: number;
}) => {
  const { userA } = friendshipMessages;
  const { userB } = friendshipMessages;

  return userId === userA.userId ? userB : userA;
};
