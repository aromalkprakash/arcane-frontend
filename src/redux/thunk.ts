import { base_Url } from "@/api/baseUrl";
import {baseAxiosInstance } from "@/lib/axiosInstance";
import { Movie } from "@/types/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const fetchConversations = createAsyncThunk<User[]>(
  "conversations/fetchConversations",
  async (_, thunkAPI) => {
    try {
      const response = await baseAxiosInstance.get("/users/getallusers");
      return response.data;
    } catch (error: any) {
      console.error("Error fetching conversations:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchSearch = createAsyncThunk(
  "search/fetchSearch",
  async (query: string) => {
    const response = await baseAxiosInstance.get(`/users/search`, {
      params: { query },
    });
    return response.data;
  }
);

export const sendMessageToUser = createAsyncThunk<Message, SendMessagePayload>(
  "conversations/sendMessageToUser",
  async ({ selectedUserId, message }, thunkAPI) => {
    try {
      const response = await baseAxiosInstance.post<Message>(
        `${base_Url}/chat/send/${selectedUserId}`,
        { message }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error sending message:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getMessages = createAsyncThunk<Message[], string>(
  "conversations/getMessages",
  async (selectedUserId, thunkAPI) => {
    try {
      const response = await baseAxiosInstance.get<Message[]>(
        `${base_Url}/chat/${selectedUserId}`
      );
      console.log(response);
      return response.data;
    } catch (error: any) {
      console.error("Error getting messages:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteMessageThunk = createAsyncThunk<string, string>(
  'conversations/deleteMessage',
  async (messageId: string, { rejectWithValue }) => {
    try {
      await baseAxiosInstance.delete(`/chat/messages/${messageId}`);
      return messageId; // Return messageId for filtering in the reducer
    } catch (error: any) {
      toast.error("Failed to delete message");
      return rejectWithValue(error.response?.data || "Failed to delete message");
    }
  }
);