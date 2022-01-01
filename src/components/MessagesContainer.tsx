import { useState, useContext, useEffect, useRef } from "react";
import { AiOutlineSend as SendBtn } from "react-icons/ai";
import { db } from "../fbconfig";

import Message from "./Message";
// import { IMessage } from "../interfaces";
import { UserContext } from "../contexts/UserContextProvider";
import {
  where,
  onSnapshot,
  collection,
  query,
  addDoc,
} from "@firebase/firestore";
import { IMessage } from "../interfaces";

interface MesssageConProps {
  currentConvoReceiverDetails: {
    name: string;
    img?: string;
    id: string | number;
  };
  conversationId: string | number;
  mobileView: boolean;
}

const MessagesContainer = ({
  currentConvoReceiverDetails,
  conversationId,
  mobileView,
}: MesssageConProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<IMessage[] | []>([]);

  useEffect(() => {
    // set listener for messages on particular conversation document id

    const collectionRef = collection(db, "messages");
    const q = query(
      collectionRef,
      where("conversationId", "==", conversationId)
    );

    const queryRealTimeUpdates = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      }) as unknown as IMessage[];
      // sort the array, showing the latest entry first

      fetchedMessages.sort((a, b) => {
        let date1 = new Date(a.sent_on);
        let date2 = new Date(b.sent_on);
        return (date1 as unknown as number) - (date2 as unknown as number);
      });

      setMessages(fetchedMessages);
    });
    window.scrollTo(0, window.innerHeight);

    return () => {
      queryRealTimeUpdates();
    };
  }, [conversationId]);
  const [message, setMessage] = useState("");
  const UserCtx = useContext(UserContext);
  const user = UserCtx?.state;
  const handleClick = (message: string) => {
    const sendMsgToDB = async () => {
      // get the collection

      const collectionRef = collection(db, "messages");
      console.log("THe TRY ", user);

      // add doc to collection
      await addDoc(collectionRef, {
        content: message,
        conversationId,
        receiverId: currentConvoReceiverDetails.id,
        receiverName: currentConvoReceiverDetails.name,
        receiverImg: currentConvoReceiverDetails.img,
        senderId: user?.id,
        senderName: user?.name,
        senderImg: user?.photo_url || "",
        sent_on: new Date().toString(),
        viewedBy: [],
      });
    };
    sendMsgToDB();
    if (scrollRef !== null) {
      window.scrollTo(
        0,
        (scrollRef.current as unknown as HTMLDivElement).getBoundingClientRect()
          .top + window.pageYOffset
      );
    }

    setMessage("");
  };

  return (
    <div className="relative">
      <div className="w-full flex relative flex-col py-4 px-4">
        <div className="messages-section">
          {messages?.length !== 0 ? (
            messages?.map((message) => (
              <Message key={message.id} {...message} />
            ))
          ) : (
            <p className="text-center"> No messages</p>
          )}
          <div ref={scrollRef} style={{ height: "25vh" }}></div>
        </div>
      </div>

      <div className=" input-section w-full">
        <div
          className={`${
            mobileView ? "w-full" : "w-4/5"
          } flex fixed items-center self-center bg-gray-100 py-4 px-4`}
          style={{
            bottom: "0",
            left: `${mobileView ? 0 : "20vw"}`,

            paddingBottom: "8vh",
          }}
        >
          <input
            placeholder="Type Message"
            className="outline-none shadow-sm bg-white flex-1 px-3 py-2 rounded-lg mr-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <SendBtn
            className="text-blue-700 text-xl"
            onClick={() => handleClick(message)}
          />
        </div>
      </div>
    </div>
  );
};

export default MessagesContainer;
