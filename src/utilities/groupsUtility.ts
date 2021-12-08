import { db } from "../fbconfig";

import { collection, getDocs, where, query, addDoc } from "@firebase/firestore";
import { IGroup } from "../interfaces";
// CHECK WETHER YOU CAN USE USECOTXT AND DISPATCH HERE
// action creators
export const getGroupsJoinedFromServer = async (userId: string) => {
  const collectionRef = collection(db, "groups");
  const q = query(collectionRef, where("members", "array-contains", userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getGroupsCreatedFromServer = async (userId: string) => {
  const collectionRef = collection(db, "groups");
  const q = query(collectionRef, where("creatorId", "==", userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    members: doc.data().members,
    description: doc.data().description,
  }));
};

export const getGroupsNotJoinedFromServer = async (userId: string) => {
  const collectionRef = collection(db, "groups");
  //negate array contains
  const snapshot = await getDocs(collectionRef);

  return snapshot.docs
    .filter((doc) => !doc.data().members.includes(userId))
    .map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      members: doc.data().members,
    }));
};

export const addGroupToServer = async (
  userId: string,
  group: { name: string }
) => {
  const collectionRef = collection(db, "groups");
  const doc = await addDoc(collectionRef, {
    name: group.name,
    photo_url: "",
    no_of_members: 1,
    members: [userId],
    creatorId: userId,
    created_on: new Date().toLocaleDateString(),
    // description: group.description,
  });

  return { ...group, id: doc.id };
};
