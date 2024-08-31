import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Message from "./Message";
import MessageSkeleton from "../../Skeletons/MessageSkeleton";
import { getMessages } from "@/redux/thunk";
import useListenMessage from "@/hooks/useListenMessage";

const Messages: React.FC = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.conversations.messages);
  const selectedUserId = useSelector((state: RootState) => state.conversations.selectedUserId);
  const isLoadingMessages = useSelector((state: RootState) => state.conversations.isLoadingMessages);

  useEffect(() => {
    if (selectedUserId) {
      dispatch(getMessages(selectedUserId) as any); 
    }
  }, [dispatch, selectedUserId]);

  useListenMessage();

  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    console.log('getMessages:', messages)
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto bg-black">
      {!isLoadingMessages &&
        messages.length > 0 &&
        messages.map((message: any, index: number) => (
          <div
            key={message._id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} />
          </div>
        ))}

      {isLoadingMessages &&
        [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)}

      {!isLoadingMessages && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default React.memo(Messages);
