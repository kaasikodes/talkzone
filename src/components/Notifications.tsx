import { showSummary } from "../utilities/helpers";
import {
  listenToNotifications,
  removeNotification,
} from "../utilities/notificationsUtility";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContextProvider";
import { notifications } from "../data";

interface INotification {
  content: string;
  read?: boolean;
  id: number | string;
  time: string;
}
const Notifications = () => {
  const { user } = useUser();
  // notification types
  // person joined/left group
  // unread messages

  const [notifications, setNotifications] = useState<INotification[] | null>(
    null
  );
  const [open, setOpen] = useState<string | null | number>(null);

  const toggleShow = (id: string) => {
    setOpen((currentId) => (currentId === id ? null : id));
  };

  const handleRemove = async (id: string) => {
    user && user?.id && (await removeNotification(id, user.id));
  };
  useEffect(() => {
    if (user) {
      const unSub = listenToNotifications(user?.id, setNotifications);

      return () => {
        unSub();
      };
    }
  }, []);

  return (
    <div className="bg-white p-8  w-full min-h-screen">
      <div className=" flex items-center justify-between pb-6">
        <div>
          <h2 className="text-gray-600 font-semibold text-2xl text-blue-900 opacity-80">
            Notifications
          </h2>
        </div>
      </div>
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Received on
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Content
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody>
                {notifications &&
                  notifications.map((item) => (
                    <Notification
                      item={item}
                      key={item.id}
                      open={open === item.id}
                      toggleShow={() =>
                        toggleShow(item.id as unknown as string)
                      }
                      onRemove={() =>
                        handleRemove(item.id as unknown as string)
                      }
                    />
                  ))}
              </tbody>
            </table>
            {/* <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
              <span className="text-xs xs:text-sm text-gray-900">
                Showing 1 to 4 of 50 Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                  Prev
                </button>
                &nbsp; &nbsp;
                <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                  Next
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;

const Notification = ({
  item,
  open,
  toggleShow,
  onRemove,
}: {
  item: INotification;
  open: boolean;
  toggleShow: Function;
  onRemove: Function;
}) => {
  return (
    <>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{item.time}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {showSummary(item.content)}
          </p>
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <button
            onClick={() => toggleShow()}
            className="relative outline-none inline-block px-3 py-1 font-semibold text-white leading-tight"
          >
            <span
              aria-hidden
              className="absolute inset-0 bg-green-700  rounded-full"
            ></span>
            <span className="relative">{open ? "Close" : "Read"}</span>
          </button>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <button
            onClick={() => onRemove()}
            className="relative outline-none inline-block px-3 py-1 font-semibold text-white leading-tight"
          >
            <span
              aria-hidden
              className="absolute inset-0 bg-red-600  rounded-full"
            ></span>
            <span className="relative">Remove</span>
          </button>
        </td>
      </tr>
      {open && (
        <tr>
          <td
            className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
            colSpan={4}
          >
            <p className="text-gray-900 whitespace-no-wrap text-center">
              {item.content}
            </p>
          </td>
        </tr>
      )}
    </>
  );
};
