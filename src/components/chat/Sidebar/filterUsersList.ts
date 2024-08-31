import { User } from "@/types/user";
import { RootState } from "../../../redux/store"; 

export const chatFilteredUsersList = (state: RootState): User[] => {
    const { chatUsersList, searchQueryForChat } = state.conversations;
    
    // Return filtered list based on searchQuery
    if (!searchQueryForChat) return chatUsersList;
    return chatUsersList.filter(user =>
        user.fullName.toLowerCase().includes(searchQueryForChat.toLowerCase())
    );
};


