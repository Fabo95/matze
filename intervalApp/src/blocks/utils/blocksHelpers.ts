import { Friendship } from "@Interval/api/utils/apiTypes";

export const getFriend = ({ friendship, userId }: { friendship: Friendship; userId?: number }) => {
    const { userA } = friendship;
    const { userB } = friendship;

    return userId === userA.userId ? userB : userA;
};
