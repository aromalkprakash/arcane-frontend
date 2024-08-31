// store.ts
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import searchReducer from './searchSlice';

export const store = configureStore({
  reducer: {
    conversations: chatReducer,
    search: searchReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => store.dispatch; // Create a hook

