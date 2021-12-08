import React, { useContext } from "react";

import { NotificationsContext } from "../contexts/NotificationsContextProvider";

interface INotification {
  content: string;
  read?: boolean;
  id: number | string;
}
const Notifications = () => {
  const NotiffyCtx = useContext(NotificationsContext);
  const notifications = NotiffyCtx?.notifications;

  // notification types
  // person joined/left group
  // unread messages

  return (
    <div className=" flex items-center bg-white px-6 mt-4 rounded-lg w-72">
      <div className="w-full overflow-hidden">
        <h4 className="text-center text-lg font-bold text-blue-400 mt-2 mb-4 capitalize">
          Notifications
        </h4>

        <div className="overflow-auto h-72 w-full">
          {notifications?.length !== 0 ? (
            notifications?.map(({ content, id }: INotification) => (
              <p key={id} className="mb-3">
                {content}
              </p>
            ))
          ) : (
            <p>no notifications avail</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
