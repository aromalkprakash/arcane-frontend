"use client"; 

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/types/rootState';
import MessageContainer from '@/components/chat/Messages/MessageContainer';
import Sidebar from '@/components/chat/Sidebar/Sidebar';
import { SocketContextProvider } from "@/components/chat/Context/SocketContext";

const Chat: React.FC = () => {
  const selectedUserId = useSelector((state: RootState) => state.conversations.selectedUserId);

  return (
    <SocketContextProvider>
      <div className='flex h-screen w-screen rounded-lg overflow-hidden bg-black bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <Sidebar />
        <MessageContainer selectedUserId={selectedUserId} />
      </div>
    </SocketContextProvider>
  );
};

export default Chat;
