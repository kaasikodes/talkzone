import { db, storage } from "../fbconfig";

import {
  collection,
  getDocs,
  where,
  query,
  addDoc,
  arrayUnion,
  doc,
  updateDoc,
  arrayRemove,
  getDoc,
  deleteDoc,
} from "@firebase/firestore";
import { IGroup } from "../interfaces";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const deleteGroupFromServer = async (groupId: string) => {
  return await deleteDoc(doc(db, "groups", groupId));
};

export const editGroupInServer = async (
  name: string,
  bio: string,

  groupId: string,
  file: any,
  setProgress: Function,
  setPhotoUrl: Function
) => {
  // if image push to fb storage n delete existing

  if (!!file) {
    const storageRef = ref(storage, `images/${file.name + groupId}`);
    const uploadFile = uploadBytesResumable(storageRef, file);

    await uploadFile.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(() => progress);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadFile.snapshot.ref).then((url) => {
          const docRef = doc(db, "groups", groupId as unknown as string);

          updateDoc(docRef, {
            name: name,
            description: bio,
            photo_url: url,
          });

          setPhotoUrl(() => url);
        });
      }
    );
    return;
  }
  // then update details on record
  // then update on fe to keep in sync
  const docRef = doc(db, "groups", groupId as unknown as string);

  await updateDoc(docRef, {
    name: name,
    description: bio,
  });

  return;
};

export const getGroupFromServer = async (id: string) => {
  const ref = doc(db, "groups", id);
  // Get a document, forcing the SDK to fetch from the offline cache.
  try {
    const doc = await getDoc(ref);
    return {
      id: doc.id,
      name: doc.data()?.name,
      photo_url: doc.data()?.photo_url,
      description: doc.data()?.description,
      members: doc.data()?.members,
    };
  } catch (e) {
    console.log("Error getting cached document:", e);
  }
};

export const addUserToGroup = (id: string, userId: string) => {
  return new Promise(async (resolve) => {
    const docRef = doc(db, "groups", id as string);
    resolve(
      updateDoc(docRef, {
        members: arrayUnion(userId),
      })
    );
  });
};
export const removeUserFromGroup = (id: string, userId: string) => {
  return new Promise(async (resolve) => {
    const docRef = doc(db, "groups", id as string);
    resolve(
      updateDoc(docRef, {
        members: arrayRemove(userId),
      })
    );
  });
};
// CHECK WETHER YOU CAN USE USECOTXT AND DISPATCH HERE
// action creators
export const getGroupsJoinedFromServer = async (userId: string) => {
  const collectionRef = collection(db, "groups");
  const q = query(collectionRef, where("members", "array-contains", userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    photo_url: doc.data().photo_url,
    description: doc.data().description,
    members: doc.data().members,
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
    creatorId: doc.data().creatorId,
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
      photo_url: doc.data().photo_url,
      members: doc.data().members,
    }));
};

export const addGroupToServer = async (
  userId: string,
  group: { name: string; description: string },
  file: any,
  setProgress: Function,
  setPhotoUrl: Function
) => {
  const collectionRef = collection(db, "groups");
  // if image push to fb storage n delete existing

  if (!!file) {
    const storageRef = ref(storage, `images/${file.name + userId}`);
    const uploadFile = uploadBytesResumable(storageRef, file);

    await uploadFile.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(() => progress);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadFile.snapshot.ref).then((url) => {
          addDoc(collectionRef, {
            name: group.name,
            photo_url: url,
            no_of_members: 1,
            members: [userId],
            creatorId: userId,
            created_on: new Date().toLocaleDateString(),
            description: group.description,
          });
          setPhotoUrl(() => url);
        });
      }
    );
    return;
  }

  await addDoc(collectionRef, {
    name: group.name,
    photo_url: "",
    no_of_members: 1,
    members: [userId],
    creatorId: userId,
    created_on: new Date().toLocaleDateString(),
    description: group.description,
  });
};
