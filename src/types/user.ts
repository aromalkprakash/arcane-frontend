// types/user.ts
export interface User {
    id: any | null | undefined;
    _id: string;
    username: string;
    image: string;
    fullName: string;
}
  
export type Movie = {
  _id: string,
  movie: string,
  title: string,
  poster: string,
}

  export interface Message {
    _id: string;
    content: string; // Changed from 'message' to 'content' to match Message component
    senderId: string;
    createdAt?: string; // Optional based on your data structure
    shouldShake?: boolean;
  }
  

export interface ConversationsState {
    usersList: User[];
    selectedUserId: string | null;
    isLoadingMessages: boolean;
    isSendingMessage: boolean;
    error: string | null;
    messages: Message[];
    authUser: User | null;
    toResetSelectedUserId: string | null;
    searchQuery: string;
    lastMessage?: Message;
}


export type SearchItem = User | Movie;

export interface SearchState {
  itemsLists: SearchItem;
  authUser: User | null;
  searchQueryForAll: string;
}

