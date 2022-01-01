import { useState, useEffect, useRef } from "react";
import { DocumentData } from "firebase/firestore";
import { useUser } from "../contexts/UserContextProvider";
import { useCurrentConversation } from "../contexts/ConversationsContextProvider";
import Message from "./Message";
import { IMessage } from "../interfaces";
import { db } from "../fbconfig";
import SearchMessagesInput from "../components/SearchMessagesInput";
import {
  where,
  onSnapshot,
  collection,
  query,
  addDoc,
} from "@firebase/firestore";
import { AiOutlineSend as SendBtn } from "react-icons/ai";

const MessageComposer = () => {
  const { user } = useUser();
  const { conversation } = useCurrentConversation();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [filteredMessages, setFilteredMessages] =
    useState<IMessage[]>(messages);

  const handleSearch = (term: string) => {
    setFilteredMessages(() =>
      messages.filter((message) => message.content.indexOf(term) !== -1)
    );
  };
  useEffect(() => {
    setFilteredMessages(() => messages);
  }, [messages]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sendMsgToDB = async () => {
      // get the collection

      const collectionRef = collection(db, "messages");

      // add doc to collection
      await addDoc(collectionRef, {
        content: message,
        conversationId: conversation && conversation?.id,
        receiverId: conversation && conversation?.receiverId,
        receiverName: conversation && conversation?.receiverName,
        receiverImg: conversation && conversation?.receiverImg,
        senderId: user && user?.id,
        senderName: user && user?.name,
        senderImg: (user && user?.photo_url) || "",
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
  useEffect(() => {
    // set listener for messages on particular conversation document id

    const collectionRef = collection(db, "messages");
    const q = query(
      collectionRef,
      where("conversationId", "==", !!conversation && conversation.id)
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

      setMessages(() => fetchedMessages);
    });
    window.scrollTo(0, window.innerHeight);

    return () => {
      queryRealTimeUpdates();
    };
  }, [conversation]);

  return (
    <div className="w-full">
      <div
        className="header  px-8 py-2 h-12 border-0 border-b border-blue-100 flex justify-between fixed w-full md:w-3/4 bg-gray-200"
        style={{ right: 0, zIndex: 3 }}
      >
        <h4># {!!conversation && conversation?.receiverName}</h4>
        <SearchMessagesInput handleSearch={handleSearch} />
        <div> +++ </div>
      </div>
      <div
        className="w-full flex relative flex-col py-4 px-4"
        style={{ top: "3rem" }}
      >
        <div className="messages-section relative">
          {filteredMessages?.length !== 0 ? (
            filteredMessages?.map((message) => (
              <Message key={message.id} {...message} />
            ))
          ) : (
            <p className="text-center"> No messages</p>
          )}
          <div ref={scrollRef} style={{ height: "25vh" }}></div>
        </div>
        <form
          onSubmit={handleClick}
          className="messageForm flex fixed items-center self-center bg-gray-100 py-4 px-4 w-full md:w-3/4"
          style={{
            bottom: "0",
            right: "0",

            paddingBottom: "8vh",
          }}
        >
          <input
            placeholder="Type Message"
            className="outline-none shadow-sm bg-white flex-1 px-3 py-2 rounded-lg mr-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">
            <SendBtn className="text-blue-700 text-xl" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageComposer;
