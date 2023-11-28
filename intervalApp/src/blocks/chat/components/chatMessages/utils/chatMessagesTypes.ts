export type SendMessage = ({
    friendshipId,
    message,
    receiverUserId,
}: {
    friendshipId: number;
    message: FormDataEntryValue | null;
    receiverUserId: number;
}) => void;
