import axios from "axios";
import { base_Url } from "./baseUrl";
import { baseAxiosInstance } from "@/lib/axiosInstance";
import { FReview } from "@/types/type";

export const getMovieReview = async (movieId: string) => {
  try {
    const url = `${base_Url}/review/getmoviereview/${movieId}`;
    const response = await axios.get(url);
    // console.log("reviewDetails", response);
    return {
      reviews: response.data.reviews || [],
      averageRating:
        response.data.averageRating !== undefined
          ? response.data.averageRating
          : null,
    };
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.error(`Movie review not found: ${error}`);
      return { reviews: [], averageRating: null };
    }
    console.error(`Error fetching movie review: ${error}`);
    return { reviews: [], averageRating: null };
  }
};

export const addReview = async (reviewData: {
  movieId: string;
  review: string;
  rating: number;
}) => {
  try {
    const response = await baseAxiosInstance.post(
      `${base_Url}/review/addreview`,reviewData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // Assuming you need credentials
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to add review");
  }
};

export const deleteReview = async (reviewId: string) => {
  try {
    await baseAxiosInstance.delete(`${base_Url}/review/delete/${reviewId}`);
  } catch (error: any) {
    console.error(
      "Error deleting review:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export async function getAllReview() {
  const url = `${base_Url}/review/getallreview`;
  const ReviewRes = await baseAxiosInstance.get(url);
  console.log(ReviewRes);
  return ReviewRes.data;
}


export const getUserReview = async (username: string) => {
  try {
    const url = `${base_Url}/review/getuserreview/${username}`;
    const response = await baseAxiosInstance.get(url);
    // console.log("reviewDetails", response)
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie review: ${error}`);
  }
};

export const getFollowingUsersReview = async (): Promise<FReview[]> => {
  try {
    const url = `${base_Url}/review/getfollowingusersreview`;
    const response = await baseAxiosInstance.get(url);
    // console.log("followingUsersReviews", response.data);
    return response.data as FReview[];
  } catch (error: any) {
    console.error(`Error fetching followingUsersReviews: ${error.message}`);
    return [];
  }
};

// like or unlike review
export const likeReview = async (
  reviewId: string,
  userId: string,
  action: "like" | "unlike"
) => {
  try {
    const response = await baseAxiosInstance.post(
      `${base_Url}/review/likeReview`,
      {
        reviewId,
        userId,
        action,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      `Error liking review: ${error.response?.data || error.message}`
    );
  }
};
