"use client";

import { GetAllUsers } from "@/api/userUrl";
import { User } from "@/types/type";
import { Suspense, useEffect, useState } from "react";
import "../../../../styles/AllUsers.scss";
import AllUsersList from "@/components/User/AllUsers/AllUsersList";
import { useRouter, useSearchParams } from "next/navigation";
import AllUserPagination from "@/components/User/pagination/allUsers";
import Navbar from "@/components/User/Navbar/Navbar";
import Loading from "@/components/User/Loading/Loading";



const AllUsers = () => {

  
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = searchParams.get("page");
  const initialPage = pageParam ? parseInt(pageParam, 10) : 1;

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [perPage] = useState<number>(9); // Set items per page to 8
  const [totalPages, setTotalPages] = useState<number>(0);


  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const UsersList = await GetAllUsers();
        console.log(UsersList);
        setUsers(UsersList);
        setTotalPages(Math.ceil(UsersList.length / perPage));
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [perPage]);


  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    router.push(`/allusers?page=${newPage}`);
  };


  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const paginatedAllUsers = users.slice(start, end);


  return (
    <div className="pt-1 pb-1 page">

      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div>
          <Navbar />
          <h1 className="member-heading">Members</h1>
          <div className="allusers-grid">
            {paginatedAllUsers?.map!((user) => (
              <AllUsersList key={user._id} user={user} />
            ))}
          </div>
        </div>
      )}
      <AllUserPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

const All_UsersWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllUsers />
    </Suspense>
  );
};

export default All_UsersWrapper;