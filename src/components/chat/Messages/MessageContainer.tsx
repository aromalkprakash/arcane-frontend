import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { RootState } from "@/redux/store"; // Adjust the import path to your store
import { GetMe } from "@/api/userUrl";
import NoChatSelected from "./NoChatSelected";
import "../../../styles/chat/chatContainer.scss"

// Define the type for props
interface MessageContainerProps {
  selectedUserId: string | null;
}

// Define the User type if not already defined
interface User {
  _id: string;
  fullName: string;
  image: string;
}

const MessageContainer: React.FC<MessageContainerProps> = ({ selectedUserId }) => {
  const [authUser, setAuthUser] = useState<User | null>(null); // Ensure you have the User type imported
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const noChatSelected = !selectedUserId;

  // Use `RootState` to type the state in useSelector
  const selectedUser = useSelector((state: RootState) =>
    state.conversations.chatUsersList?.find((user) => user._id === selectedUserId)
  );

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const user = await GetMe();
        setAuthUser(user);
      } catch (error) {
        setError(error as Error);
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthUser();
  }, []);

  return (
    <div className="w-full flex flex-col min-h-[100vh] bg-black">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching user data</p>
      ) : noChatSelected ? (
        <NoChatSelected authUser={authUser} />
      ) : (
        <>
          <div className="bg-black px-4 py-10 h-[80px]">
            <span className="label-text">To:</span>{" "}
            <span className="text-white px-4 py-2 to-user">
              {selectedUser?.fullName}
                  </span>
                  <hr className="mt-2"/>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;