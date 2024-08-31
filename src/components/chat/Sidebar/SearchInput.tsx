import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoSearchSharp } from 'react-icons/io5';
import { setSearchQueryForChat } from "@/redux/chatSlice";
import { RootState } from "@/types/rootState"; // Import RootState for type safety
import { AppDispatch } from "@/redux/store";
import { toast } from "sonner";
import { chatFilteredUsersList } from "./filterUsersList"; // Ensure the correct import path


const SearchInput: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchQuery = useSelector((state: RootState) => state.conversations.searchQueryForChat);

  // Access the entire state to pass to the filteredUsersList function
  const state = useSelector((state: any) => state);
  const filteredUsersLists: User[] = chatFilteredUsersList(state); 
  
  // console.log(" chat Search Query:", searchQuery);
  // console.log("chat Filtered Users List:", filteredUsersLists);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    dispatch(setSearchQueryForChat(query));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex items-center gap-2'>
        <input
          type='text'
          placeholder='Search…'
          className='input input-bordered rounded-full w-[full]'
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
          <IoSearchSharp className='w-6 h-6 outline-none' />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
