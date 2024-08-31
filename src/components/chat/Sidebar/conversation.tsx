import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { chatFilteredUsersList } from "./filterUsersList";
import { selectUser, toResetSelectedUserId } from "@/redux/chatSlice";
import { useSocketContext } from "../Context/SocketContext";
import { fetchConversations } from "@/redux/thunk";
import { AppDispatch } from "@/redux/store";

export interface User {
  _id: any;
  fullName: string;
  image: string;
  username: string; // Ensure this property exists if used in filter
}

const Conversation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: any) => state);

  const { selectedUserId, isLoadingMessages, error } = state.conversations;
  const { onlineUsers } = useSocketContext();

  const filteredUsersLists: User[] = chatFilteredUsersList(state);

  useEffect(() => {
    dispatch(fetchConversations());

    return () => {
      dispatch(toResetSelectedUserId());
    };
  }, [dispatch]);

  const handleUserClick = (userId: string) => {
    dispatch(selectUser(userId));
  };

  if (isLoadingMessages) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-h-[100%]  overflow-auto">
      {filteredUsersLists?.length ? (
        filteredUsersLists.map((user: User, index: number) => {

          
          const isOnline = onlineUsers.includes(user._id); // Check if user._id is in onlineUsers array

         
          return (
            <React.Fragment key={user._id} >
              <div
                className={`flex gap-2 items-center rounded p-2 py-1 cursor-pointer  
                  ${selectedUserId === user._id ? "bg-blue-500" : "hover:bg-sky-500"}`}
                onClick={() => handleUserClick(user._id)}
              >
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                  <div className="w-[55px] rounded-full">
                    <img src={(user.image || "/user.png")} alt="user avatar" />
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex gap-3 justify-between">
                    <p className="font-bold text-gray-200">{user.fullName}</p>
                  </div>
                </div>
              </div>
              {index < filteredUsersLists?.length - 1 && (
                <div className="divider my-0 py-0 h-1" />
              )}
            </React.Fragment>
          );
        })
      ) : (
        <div>No users found</div>
      )}
    </div>
  );
};

export default Conversation;
