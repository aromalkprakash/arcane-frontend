import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store"; 
import { BsSend } from "react-icons/bs";
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'; 
import { sendMessageToUser } from "@/redux/thunk";
import { BsEmojiSmile } from "react-icons/bs"; 

const MessageInput: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.conversations.isSendingMessage);
  const selectedUserId = useSelector((state: RootState) => state.conversations.selectedUserId);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState(""); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!message.trim() || !selectedUserId) return;

    try {
      await dispatch(sendMessageToUser({ selectedUserId, message }) as any);
      setMessage(""); 
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage(prev => prev + emojiData.emoji); 
  };

  return (
    <form className="px-4 bg-black" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <div className="relative">
          <button
            type="button"
            className="absolute inset-y-0 start-0 flex items-center ps-3 mt-[40px]"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <BsEmojiSmile size={25} className="text-white" />
          </button>
          {showEmojiPicker && (
            <div className="absolute bottom-[100px] start-0">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
        <input
          type="text"
          name="message"
          className="border text-sm rounded-lg block w-full h-[80px] px-10 bg-black border-white text-white mb-4"
          placeholder="Send a message"
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
        />
        <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3" disabled={loading}>
          {loading ? <div className="loading loading-spinner"></div> : <BsSend size={30} />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
