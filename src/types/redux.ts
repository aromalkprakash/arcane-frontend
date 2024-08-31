
// Define a type for the sendMessage payload
interface SendMessagePayload {
  selectedUserId: string;
  message: string;
}

// Define a type for the getMessages parameter
type GetMessagesParam = string; // The selectedUserId is a string

// Define a type for the conversation or user data
interface User {
  id: any;
  _id: string;
  username: string;
  image: string;
  fullName: string;

  // Add other relevant user properties here
}

interface Message {
  _id: string;
  content: string; // Changed from 'message' to 'content' to match Message component
  senderId: string;
  receiverId: string;
  message?: string;
  createdAt?: string; // Optional based on your data structure
  shouldShake?: boolean;
  chatUsersList: any;
  // Add other relevant message properties here
}[]

interface ConversationsState {
  conversations: Message[];
  chatUsersList: User[];
  selectedUserId: string | null;
  isLoadingMessages: boolean;
  isSendingMessage: boolean;
  error: string | null;
  messages: Message[];
  authUser: User | null ;
  toResetSelectedUserId: string | null;
  searchQueryForChat: string;
  lastMessage?: Message; 
}

interface Movie {
  _id: string,
  movie: string,
  title: string,
  poster: string,
}

interface SearchState {
  movies: Movie[];
  users: User[];
  // searchList: Movie[] | User[]
  searchQuery: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Define the props for the Message component
interface MessageProps {
  message: {
      _id: string;
      senderId: string;
      message: string;
      createdAt: string;
    shouldShake?: boolean;
  };
}



