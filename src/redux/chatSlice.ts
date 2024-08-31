import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchConversations, getMessages, sendMessageToUser, deleteMessageThunk } from "./thunk";

const initialState: ConversationsState = {
  chatUsersList: [],
  selectedUserId: null,
  isLoadingMessages: false,
  isSendingMessage: false,
  error: null,
  messages: [],
  authUser: null,
  toResetSelectedUserId: null,
  searchQueryForChat: "",
  lastMessage: undefined,
  conversations: []
};

const chatSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<string | null>) => {
      state.selectedUserId = action.payload;
    },
    toResetSelectedUserId: (state) => {
      state.selectedUserId = null; // Reset selectedUserId here
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    setAuthUser: (state, action: PayloadAction<User | null>) => {
      state.authUser = action.payload;
      console.log("Auth User:", action.payload);
    },
    setSearchQueryForChat: (state, action: PayloadAction<string>) => {
      state.searchQueryForChat = action.payload;
    },
    deleteMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(message => message._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.isLoadingMessages = true;
      })
      .addCase(fetchConversations.fulfilled, (state, action: PayloadAction<User[]>) => {
        console.log("Fetched users:", action.payload);
        state.isLoadingMessages = false;
        state.chatUsersList = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.isLoadingMessages = false;
        state.error = action.error.message || null;
      })
      .addCase(sendMessageToUser.pending, (state) => {
        state.isSendingMessage = true;
      })
      .addCase(sendMessageToUser.fulfilled, (state, action: PayloadAction<Message>) => {
        state.isSendingMessage = false;

        // Only add the message if it doesn't already exist
        if (!state.messages.some(msg => msg._id === action.payload._id)) {
          state.messages = [...state.messages, action.payload];
        }

        state.lastMessage = action.payload;
      })
      .addCase(sendMessageToUser.rejected, (state, action) => {
        state.isSendingMessage = false;
        state.error = action.error.message || null;
      })
      .addCase(getMessages.pending, (state) => {
        state.isLoadingMessages = true;
      })
      .addCase(getMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
        console.log('Setting messages:', action.payload);
        state.isLoadingMessages = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoadingMessages = false;
        state.error = action.error.message || null;
      })
      .addCase(deleteMessageThunk.pending, (state) => {
        // No state change required for pending delete
      })
      .addCase(deleteMessageThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.messages = state.messages.filter(message => message._id !== action.payload);
      })
      .addCase(deleteMessageThunk.rejected, (state, action) => {
        state.error = action.error.message || null;
      });
  },
});

export const {
  selectUser,
  toResetSelectedUserId,
  setAuthUser,
  setSearchQueryForChat,
  setMessages,
  deleteMessage
} = chatSlice.actions;

export default chatSlice.reducer;
