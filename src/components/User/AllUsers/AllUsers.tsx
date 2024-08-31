"use client";
import { GetAllUsers } from "@/api/userUrl";
import { User } from "@/types/type";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import AllUsersList from "./AllUsersList";
import "../../../styles/AllUsers.scss";



const AllUsers = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const UsersList = await GetAllUsers();
        console.log(UsersList);
        setUsers(UsersList);
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="pt-1 pb-1 page">
      <h1 className="text-center font-normal text-2xl mt-3">Members</h1>
      {loading ? (
        <div className="flex justify-center items-center mt-16">
          <Loader size={42} className="animate-spin" />
        </div>
      ) : (
        <div className="allusers-grid">
          {users?.map!((user) => (
            <AllUsersList key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsers;
