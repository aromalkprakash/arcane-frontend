import { baseAxiosInstance } from "@/lib/axiosInstance";
import { base_Url } from "./baseUrl";

export async function getAllMovies() {
  const url = `${base_Url}/movie/getallmovies`;
  const MovieRes = await baseAxiosInstance.get(url);
  console.log(MovieRes);
  return MovieRes.data;
}

export async function getSingleMovie(movieId: string) {
  console.log(`Fetching movie with ID: ${movieId}`);
  const url = `${base_Url}/movie/getmoviedetails/${movieId}`;
  console.log(`URL: ${url}`);
  const singleMovieRes = await baseAxiosInstance.get(url);
  console.log(singleMovieRes);
  return singleMovieRes.data;
}
