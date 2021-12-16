import { MdGroupAdd } from "react-icons/md";
import { RiChatNewFill, RiNotification4Fill } from "react-icons/ri";
import { AiOutlineUsergroupAdd, AiFillIdcard } from "react-icons/ai";
import ActionItem from "../components/ActionItem";
import { useEffect, useContext } from "react";
import { NotificationsContext } from "../contexts/NotificationsContextProvider";

import { where, onSnapshot, collection, query } from "@firebase/firestore";
import { db } from "../fbconfig";
import { UserContext } from "../contexts/UserContextProvider";

interface Iprops {
  setComponentName: Function;
}

const UserActionItems = (props: Iprops) => {
  const NotifyCtx = useContext(NotificationsContext);
  const notifications = NotifyCtx?.notifications;
  const setNotifications = NotifyCtx?.setNotifications;
  const UserCtx = useContext(UserContext);
  const user = UserCtx?.state;
  console.log("USER", user);
  const { setComponentName } = props;
  useEffect(() => {
    const collectionRef = collection(db, "notifications");
    const q = query(
      collectionRef,
      where(
        "toWhomItMayConcern",
        "array-contains",
        user?.id as unknown as string
      )
    );

    const queryRealTimeUpdates = onSnapshot(q, (querySnapshot) => {
      const fetchedNotifications = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          content: doc.data().content,
          time: doc.data().time,
        }))
        .sort((a, b) => {
          let date1 = new Date(a.time);
          let date2 = new Date(b.time);
          return (date1 as unknown as number) - (date2 as unknown as number);
        });
      (setNotifications as unknown as Function)(fetchedNotifications);
    });

    return () => {
      queryRealTimeUpdates();
    };
  }, [setNotifications, user]);
  return (
    <>
      <div className="action-items-container px-4 flex flex-col pt-4 pb-10">
        {/* actions for these are suppose to be enum as the val dont change */}
        <ActionItem
          text="start conversation"
          handleClick={() => setComponentName("conversation starter")}
        >
          <RiChatNewFill />
        </ActionItem>
        <ActionItem
          text="Create Group"
          handleClick={() => setComponentName("create group form")}
        >
          <AiOutlineUsergroupAdd />
        </ActionItem>
        <ActionItem
          text="Join Group"
          handleClick={() => setComponentName("join group")}
        >
          <MdGroupAdd />
        </ActionItem>
        <ActionItem
          text="Manage Groups"
          handleClick={() => setComponentName("manage groups")}
        >
          <AiFillIdcard />
        </ActionItem>
        <ActionItem
          text={`Notifications(${notifications?.length})`}
          handleClick={() => setComponentName("notifications")}
        >
          <RiNotification4Fill />
        </ActionItem>
        {/* This should be in side bar heading */}
        {/* <ActionItem
          text="Settings"
          handleClick={() => setComponentName("settings")}
        >
          <AiFillSetting />
        </ActionItem> */}
      </div>
    </>
  );
};

export default UserActionItems;
