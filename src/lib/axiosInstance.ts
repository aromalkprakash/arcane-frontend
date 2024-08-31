import { base_Url } from "@/api/baseUrl";
import axios from "axios";


export const baseAxiosInstance = axios.create({
  baseURL: `${base_Url}`,
  withCredentials: true,
});

