// rootState.ts
export interface MessageType {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  shouldShake: boolean;
}

// export interface ConversationsState {
// //   messages: MessageType[];
// //   selectedUserId: string | null;
// //   isLoadingMessages: boolean;
// //   usersList: User[];
// //   searchQueryForChat: string;
// //   searchQueryForAll: string;
// //   isLoading: boolean;
// //   error: string | null;
// // }

export interface RootState {
  conversations: ConversationsState;
  search: SearchState;
}
