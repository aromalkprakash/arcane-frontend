import { base_Url } from "@/api/baseUrl";
import axios from "axios";
import React from "react";
import { toast } from "sonner";

const LogOut = () => {
  const logout = async () => {
    try {
      const response = await axios.post(
        `${base_Url}/users/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Logged Out");
      } else {
        toast.error("Logout failed");
      }
    } catch (error: any) {
      console.error("Error during logout:", error);
      toast.error("Network Error");
    }
  };

  return (
    <div>
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default LogOut;
