import { collection, getDocs } from "firebase/firestore";
import { db } from "../fbconfig";

export const getPersonsFromServer = async (userId: string) => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs
    .filter((doc) => doc.id !== userId)
    .map((doc) => {
      return {
        id: doc.id,
        name: doc.data().displayName,
        photo_url: doc.data().photo_url,
      };
    });
};
