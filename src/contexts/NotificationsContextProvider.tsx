import { useState, createContext, useEffect } from "react";
import { INotification } from "../interfaces";

interface INotifiyCtx {
  notifications: INotification[];
  setNotifications: Function;
}

export const NotificationsContext = createContext<INotifiyCtx | null>(null);
const NotificationsContextProvider: React.FC = (props) => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    // fetch Notifications showing ordering Notifications by the no of messages unread by user in each conv0
    // this will prob have to be a snap shot, or periodic call
    // THE USER GETS NOTIG+F
    // about those who joined a group
    // a new conversation is started for first time
    // a person leaves a group
    //  a group no longer exists
    // a groups name was changed or the picture was changed
  }, []);
  return (
    <NotificationsContext.Provider value={{ notifications, setNotifications }}>
      {props.children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsContextProvider;
