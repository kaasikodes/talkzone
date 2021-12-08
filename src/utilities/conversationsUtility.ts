export function hashConversationId(receiverId: string, senderId: string) {
  let hashedId = senderId + receiverId;

  if (receiverId > senderId) {
    hashedId = receiverId + senderId;
    return hashedId;
  }
  return hashedId;
}
