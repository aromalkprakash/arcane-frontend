import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useSocketContext } from "@/components/chat/Context/SocketContext";
import { setMessages } from "@/redux/chatSlice";
import { RootState } from "@/redux/store";

const useListenMessage = () => {
  const dispatch = useDispatch();
  const { socket } = useSocketContext();
const messages = useSelector((state: RootState) => state.conversations.messages);

useEffect(() => {
  if (socket) {
    console.log('Socket is connected, setting up listener for newMessage');
    socket.on("newMessage", (newMessage) => {
      try {
        newMessage.shouldShake = true;
        // const sound = new Audio(notificationSound);
        // sound.play();
        console.log('Received newMessage event:', newMessage);
        if (!messages.find((msg) => msg._id === newMessage._id)) {
          dispatch(setMessages([...messages, newMessage]));
        }
      } catch (error) {
        console.error('Error handling newMessage event:', error);
      }
    });
  }
  return () => {
    if (socket) {
      console.log('Cleaning up listener for newMessage');
      socket.off("newMessage");
    }
  };
}, [socket, dispatch, messages]);

return null;
};

export default useListenMessage;
