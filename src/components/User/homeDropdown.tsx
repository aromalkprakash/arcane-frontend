import React from "react";
import Link from "next/link";
import { User } from "@/types/type";
import "../../styles/dropdown.scss";
import { toast } from "sonner";
import axios from "axios";
import { base_Url } from "@/api/baseUrl";

// Logout function
const logout = async () => {
  try {
    const response = await axios.post(
      `${base_Url}/auth/logout`,
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

type Props = {
  user: User;
};

const HomeDropdown = ({ user }: Props) => {
  return (
    <div className="dropdown-container">
      <img src={(user?.image || "/user.png")} alt="user avatar" className="avatar" />
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="dd-name">
          {user.username}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-white square-box z-[1] w-52  shadow-black"
        >
          <li className="li">
            <Link href={`/profile/${user.username}`}>Profile</Link>
          </li>
          <li className="li">
            <button onClick={logout} className="sign-out-button">
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomeDropdown;
