import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  arrayRemove,
} from "@firebase/firestore";
import { IGroup, IUser } from "../interfaces";
import { db } from "../fbconfig";
import moment from "moment";

const collectionRef = collection(db, "notifications");

export const notifyMembersOfGroup = (
  group: IGroup,
  newMember: IUser,
  leaving: boolean
) => {
  if (leaving) {
    return new Promise(async (resolve) => {
      resolve(
        addDoc(collectionRef, {
          content: `${newMember.name} just left ${group.name}`,

          toWhomItMayConcern: group.members?.filter(
            (member) => member !== newMember.id
          ),
          time: new Date().toString(),
        })
      );
    });
  }
  return new Promise(async (resolve) => {
    resolve(
      addDoc(collectionRef, {
        content: `${newMember.name} just joined ${group.name}`,
        toWhomItMayConcern: group.members,
        time: new Date().toString(),
      })
    );
  });
};

export const removeNotification = async (id: string, userId: string) => {
  return await updateDoc(doc(db, "notifications", id), {
    toWhomItMayConcern: arrayRemove(userId),
  });
};

export const listenToNotifications = (
  userId: string,
  setNotifications: Function
) => {
  const q = query(
    collectionRef,
    where("toWhomItMayConcern", "array-contains", userId)
  );

  const queryRealTimeUpdates = onSnapshot(q, (querySnapshot) => {
    const fetchedNotifications = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        content: doc.data().content,
        time: doc.data().time,
        read: doc.data()?.read ? doc.data().read : false,
      };
    });

    const orderedNotifications = fetchedNotifications
      .sort((a, b) => {
        let date1 = new Date(a.time);
        let date2 = new Date(b.time);
        return (date1 as unknown as number) - (date2 as unknown as number);
      })
      .map((item) => ({ ...item, time: moment(item.time).fromNow() }))
      .reverse();

    setNotifications(() => orderedNotifications);
  });

  return queryRealTimeUpdates;
};
