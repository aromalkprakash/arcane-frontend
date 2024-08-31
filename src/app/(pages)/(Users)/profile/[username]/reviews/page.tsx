"use client";

import { Suspense, useEffect, useState } from "react";
import { getUserReview } from "@/api/reviewUrl";
import "../../../../../../styles/profile.scss";
import "../../../../../../styles/profilePage.scss";
import { useSearchParams, useRouter } from "next/navigation";
import UserReview from "@/components/User/userReview";
import { UReview } from "@/types/type";
import UserReviewsPagination from "@/components/User/pagination/userReviews";
import Loading from "@/components/User/Loading/Loading";

interface ProfileProp {
    params: { username: string };
}

const UserProfileReviews: React.FC<ProfileProp> = ({ params }) => {
    const { username } = params;
    const searchParams = useSearchParams();
    const router = useRouter();

    const pageParam = searchParams.get("page");
    const initialPage = pageParam ? parseInt(pageParam, 10) : 1;

    const [reviews, setReviews] = useState<UReview[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(initialPage);
    const [perPage, setPerPage] = useState<number>(8); // Set items per page to 8
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const ReviewList = await getUserReview(username);
                setReviews(ReviewList);
                setTotalPages(Math.ceil(ReviewList.length / perPage));
            } catch (error) {
                console.error("Error fetching reviews:", error);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [username, currentPage, perPage]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        router.push(`/profile/${username}/reviews?page=${newPage}`);
    };

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const paginatedReviews = reviews?.slice(start, end);

    return (
        <><div className="user-review-page">
            {loading ? (
                <div><Loading/></div>
            ) : (
                <div>
                        <h1 className="review-heading">Reviews by {username}</h1>
                    <div className="userpp-review-grid">
                        {paginatedReviews?.map((review) => (
                            <UserReview key={review._id} review={review} />
                        ))}
                    </div>
                    <UserReviewsPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        perPage={perPage}
                        onPageChange={handlePageChange}
                        username={username} // Pass username to pagination component
                    />
                    </div>
                    
            )}</div>
        </>
    );
};

const UserProfileReviewsWrapper = ({ params }: ProfileProp) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UserProfileReviews params={params} />
        </Suspense>
    );
};

export default UserProfileReviewsWrapper;
