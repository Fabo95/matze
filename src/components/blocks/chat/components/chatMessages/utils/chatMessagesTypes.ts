export type SendMessage = ({
  message,
  friendshipId,
  receiverUserId,
}: {
  message: FormDataEntryValue | null;
  friendshipId: number;
  receiverUserId: number;
}) => void;
