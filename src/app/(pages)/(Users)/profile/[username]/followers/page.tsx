"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { followersDetails } from '@/api/userUrl';
import { toast } from 'sonner';
import { User } from "@/types/type";
import "../../../../../../styles/AllUsers.scss";
import AllUsersList from "@/components/User/AllUsers/AllUsersList";
import FollowersPagination from "@/components/User/pagination/followers";
import Navbar from "@/components/User/Navbar/Navbar";
import Loading from "@/components/User/Loading/Loading";

interface FollowersPageProps {
  params: {
    username: string;
  };
}

const FollowersPage: React.FC<FollowersPageProps> = ({ params }) => {
  const { username } = params;
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = searchParams.get("page");
  const initialPage = pageParam ? parseInt(pageParam, 10) : 1;

  const [followers, setFollowers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [perPage] = useState<number>(8); // Set items per page to 8
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchFollowers = async () => {
      setLoading(true);
      try {
        const data = await followersDetails(username);
        setFollowers(data.followers);
        setTotalPages(Math.ceil(data.followers.length / perPage));
      } catch (error) {
        console.error('Error fetching followers:', error);
        setError('Failed to load followers');
        toast.error('Failed to load followers');
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [username, perPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    router.push(`/profile/${username}/followers?page=${newPage}`);
  };

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const paginatedFollowers = followers.slice(start, end);

  if (loading) {
    return <div><Loading /></div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (followers.length === 0) {
    return <p className="text-center font-normal text-2xl mt-6 mb-6">No followers found.</p>;
  }

  return (
    <div className="page">
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div>
          <Navbar />
          <h1 className="text-center font-normal text-2xl mt-6 mb-6">Followers of {username}</h1>
          <div className="allusers-grid">
            {paginatedFollowers.map((user) => (
              <AllUsersList key={user._id} user={user} />
            ))}
          </div>
          <FollowersPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            username={username}
          />
        </div>
      )}
    </div>
  );
};

const FollowersPageWrapper = ({ params }: FollowersPageProps) => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <FollowersPage params={params} />
      </Suspense>
    );
  };

export default FollowersPage;
