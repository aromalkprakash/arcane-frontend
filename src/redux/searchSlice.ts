// redux/searchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSearch } from './thunk'; // Adjust import path

interface SearchState {
  users: User[];
  movies: Movie[];
  searchQuery: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SearchState = {
  users: [],
  movies: [],
  searchQuery: '',
  status: 'idle',
  error: null,
};

// Create the slice
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSearch.fulfilled, (state, action: PayloadAction<{ movies: Movie[]; users: User[] }>) => {
        state.status = 'succeeded';
        state.users = action.payload.users;
        state.movies = action.payload.movies;
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
