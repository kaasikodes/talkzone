import {
  arrayUnion,
  doc,
  updateDoc,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db, storage } from "../fbconfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getAuth, signOut } from "firebase/auth";
import { IConversation } from "../interfaces";

export const listenToCurrentConversations = (
  userId: string,
  setConversations: Function
) => {
  const docRef = doc(db, "users", userId);

  const queryRealTimeUpdates = onSnapshot(docRef, (doc) => {
    if (!!doc) {
      const conversations: DocumentData[] = doc.data()?.conversations;

      const orderedConversations = conversations
        .sort((a, b) => {
          let date1 = new Date(a.beganOn);
          let date2 = new Date(b.beganOn);
          return (date1 as unknown as number) - (date2 as unknown as number);
        })
        .splice(0, 5);

      setConversations(() => orderedConversations);
    }
  });

  return queryRealTimeUpdates;
};

export const addConversationtoUserConversations = async (
  userId: string,
  convo: IConversation
) => {
  try {
    await updateDoc(doc(db, "users", userId), {
      conversations: arrayUnion({
        id: convo.id,
        name: convo.name,
        beganOn: new Date().toString(),
      }),
    });

    console.log("Success");
  } catch (error) {
    console.log("current error", error);
  }
};

export const editUserInServer = async (
  name: string,
  bio: string,

  userId: string,
  file: any,
  setProgress: Function,
  setPhotoUrl: Function
) => {
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
          const docRef = doc(db, "users", userId as unknown as string);

          updateDoc(docRef, {
            displayName: name,
            bio,
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
  const docRef = doc(db, "users", userId as unknown as string);

  await updateDoc(docRef, {
    displayName: name,
    bio,
  });

  return;
};

export const logOutUser = () => {
  const auth = getAuth();
  return signOut(auth);
};
