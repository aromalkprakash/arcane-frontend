import React from "react";
import { TiMessages } from "react-icons/ti";
import "../../../styles/chat/chatContainer.scss"

// Define the User type if not already defined
interface User {
  fullName: string;
}

interface NoChatSelectedProps {
  authUser: User | null;
}

const NoChatSelected: React.FC<NoChatSelectedProps> = ({ authUser }) => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-black">
      <div className="no-chat-selected">
        <p>Welcome 👋 {authUser?.fullName || 'User'}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages  size={80} className="m-symbol" />
      </div>
    </div>
  );
};

export default NoChatSelected;
