"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { followingDetails } from '@/api/userUrl';
import { toast } from 'sonner';
import { User } from "@/types/type";
import AllUsersList from "@/components/User/AllUsers/AllUsersList";
import "../../../../../../styles/AllUsers.scss";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import FollowingPagination from "@/components/User/pagination/following";
import Navbar from "@/components/User/Navbar/Navbar";
import Loading from "@/components/User/Loading/Loading";

interface FollowingPageProps {
  params: {
    username: string;
  };
}

const FollowingPage: React.FC<FollowingPageProps> = ({ params }) => {
    const { username } = params;
    const searchParams = useSearchParams();
    const router = useRouter();
  
    const pageParam = searchParams.get("page");
    const initialPage = pageParam ? parseInt(pageParam, 10) : 1;

    const [following, setFollowing] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState<number>(initialPage);
    const [perPage] = useState<number>(8); // Set items per page to 8
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const data = await followingDetails(username);
                setFollowing(data.following);
                setTotalPages(Math.ceil(data.following.length / perPage));

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
        router.push(`/profile/${username}/following?page=${newPage}`);
    };
    
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const paginatedFollowing = following.slice(start, end);
    

    if (loading) {
        return <div><Loading /></div>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (following?.length === 0) {
        return <p>No following users found.</p>;
    }
    
    return (
        
        <div className="page">
            {loading ? (<div><Loading /></div>) : (
                <div>
                    <Navbar />
                    <h1 className="text-center font-normal text-2xl mt-6 mb-6">Following of {username}</h1>
                    <div className="allusers-grid">
                        {paginatedFollowing?.map!((user) => (
                            <AllUsersList key={user._id} user={user} />
                        ))}
                    </div>
                    <FollowingPagination
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

const FollowingPageWrapper = ({ params }: FollowingPageProps) => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <FollowingPage params={params} />
      </Suspense>
    );
  };


export default FollowingPage;
