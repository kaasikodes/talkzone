// should be put in helper function
export const showSummary = (text: string) => {
  return text.length > 50 ? text.substring(0, 45) + " ..." : text;
};

export function hashConversationId(receiverId: string, senderId: string) {
  let hashedId = senderId + receiverId;

  if (receiverId > senderId) {
    hashedId = receiverId + senderId;
    return hashedId;
  }
  return hashedId;
}
