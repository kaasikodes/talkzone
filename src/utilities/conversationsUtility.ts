import { db } from "../fbconfig";
import { setDoc, getDoc, doc } from "firebase/firestore";

export function hashConversationId(receiverId: string, senderId: string) {
  let hashedId = senderId + receiverId;

  if (receiverId > senderId) {
    hashedId = receiverId + senderId;
    return hashedId;
  }
  return hashedId;
}

export const doesConversationExists = async (id: string) => {
  const docRef = doc(db, "conversations", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return true;
  }
  return false;
};

export const createConversation = async (id: string) => {
  const docRef = doc(db, "conversations", id);

  await setDoc(docRef, {
    createdOn: new Date().toString(),
  });
};

// conversation - id,createdOn
