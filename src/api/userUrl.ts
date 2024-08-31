import { base_Url } from "./baseUrl";
import { baseAxiosInstance } from "@/lib/axiosInstance";

export const signupUser = async (formData: { fullName: string; username: string; email: string; password: string; }) => {
  try {
    const response = await baseAxiosInstance.post(`${base_Url}/auth/signup`, formData);
    console.log(formData)
    return response;
  } catch (error) {
    throw new Error('Failed to create account');
  }
};


export const loginUser = async (formData: { username: string; password: string; }) => {
  try {
    const response = await baseAxiosInstance.post(`${base_Url}/auth/login`, formData);
    return response;
  } catch (error) {
    throw new Error('Failed to login');
  }
};

export const googleAuth = async (code: any) => {
  try {
    console.log("Sending code to backend:", code);
    const response = await baseAxiosInstance.get(
      `${base_Url}/auth/google?code=${code}`
    );
    console.log("Backend response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during googleAuth API call:", error);
    throw error;
  }
};

export const GetMe = async () => {
  try {
    const res = await baseAxiosInstance.get(`${base_Url}/auth/me`);
    return res.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const Logout = async () => {
  try {
    const res = await baseAxiosInstance.post(`${base_Url}/users/logout`);
    return res.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const GetUserDetails = async (username: string) => {
  try {
    const res = await baseAxiosInstance.get(
      `${base_Url}/users/getuserdetails/${username}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const updateUserProfile = async (updatedUser: any) => {
  try {
    const response = await baseAxiosInstance.post(
      `${base_Url}/users/updateprofile`,
      updatedUser
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetAllUsers = async () => {
  try {
    const res = await baseAxiosInstance.get(`${base_Url}/users/getallusers`);
    return res.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const followUser = async (userId: string) => {
  try {
    await baseAxiosInstance.post(`${base_Url}/users/follow/${userId}`);
  } catch (error) {
    throw error;
  }
};

export const unfollowUser = async (userId: string) => {
  try {
    await baseAxiosInstance.post(`${base_Url}/users/unfollow/${userId}`);
  } catch (error) {
    throw error;
  }
};

export const updateLikedReviews = async (
  reviewId: string,
  userId: string,
  action: "like" | "unlike"
) => {
  try {
    const response = await baseAxiosInstance.post(
      `${base_Url}/users/updateLikedReviews`,
      {
        reviewId,
        userId,
        action,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      `Error updating liked reviews: ${error.response?.data || error.message}`
    );
  }
};

export const updateWatchList = async (
  movieId: string,
  userId: string,
  action: "add" | "remove"
) => {
  try {
    const response = await baseAxiosInstance.post(
      `${base_Url}/users/watchlist`,
      {
        movieId,
        userId,
        action,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      `Error updating watchlist: ${error.response?.data || error.message}`
    );
  }
};

export const updateFavorite = async (
  movieId: string,
  userId: string,
  action: "addToFavorite" | "removeFromFavorite"
) => {
  try {
    const response = await baseAxiosInstance.post(
      `${base_Url}/users/favorite`,
      {
        movieId,
        userId,
        action,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      `Error updating favorite: ${error.response?.data || error.message}`
    );
  }
};

export const profilePageCounts = async (username: string) => {
  try {
    const response = await baseAxiosInstance.get(
      `${base_Url}/users/counts/${username}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const watchList = async (username: string) => {
  try {
    const response = await baseAxiosInstance.get(
      `${base_Url}/users/watchlistdetails/${username}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const followingDetails = async (username: string) => {
  try {
    const response = await baseAxiosInstance.get(
      `${base_Url}/users/getfollowingdetails/${username}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const followersDetails = async (username: string) => {
  try {
    const response = await baseAxiosInstance.get(
      `${base_Url}/users/getfollowersdetails/${username}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const watchListDetails = async (username: string) => {
  try {
    const response = await baseAxiosInstance.get(
      `${base_Url}/users/getwatchlistdetails/${username}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const likedReviewDetails = async (username: string) => {
  try {
    const response = await baseAxiosInstance.get(
      `${base_Url}/users/getlikedreviewdetails/${username}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const favoriteMovieDetails = async (username: string) => {
  try {
    const response = await baseAxiosInstance.get(
      `${base_Url}/users/getfavoritemoviedetails/${username}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchUser = async (query: string) => {
  try {
    const response = await baseAxiosInstance.get("/users/search/all", {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch search results:", error);
    throw error;
  }
};
