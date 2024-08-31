"use client";

import { likedReviewDetails } from "@/api/userUrl";
import LikedreviewList from "@/components/User/LikedReviewList";
import LikedReviewsPagination from "@/components/User/pagination/likedReview";
import { FReview } from "@/types/type";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from 'sonner';
import "../../../../../../styles/followingUsersReviews.scss";
import Loading from "@/components/User/Loading/Loading";

interface LikedReviewProps {
  params: { username: string };
}

const LikedReviewPage: React.FC<LikedReviewProps> = ({ params }) => {
  const { username } = params;
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = searchParams.get("page");
  const initialPage = pageParam ? parseInt(pageParam, 10) : 1;

  const [reviews, setReviews] = useState<FReview[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [perPage, setPerPage] = useState<number>(8); // Set items per page to 8
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const ReviewList = await likedReviewDetails(username);
        setReviews(ReviewList.likedReviews);
        setTotalPages(Math.ceil(ReviewList.likedReviews.length / perPage));
      } catch (error) {
        console.error("Error fetching reviews:", error);
        toast.error('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [currentPage, perPage, username]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    router.push(`/profile/${username}/likedreviews?page=${newPage}`);
  };

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const paginatedReviews = reviews?.slice(start, end);


  if (reviews?.length === 0) {
    return <p>No Liked reviews found.</p>;
  };

  return (
    <>
      <div className="page">
        {loading ? (
          <div><Loading/></div>
        ) : (
          <div className="fu-review-page">
            <h1 className="following-review-title">Liked reviews of {username}</h1>
            <div className="review-grid">
              {paginatedReviews?.map((review) => (
                <LikedreviewList key={review._id} review={review} />
              ))}
            </div>
            <LikedReviewsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              perPage={perPage}
              onPageChange={handlePageChange}
              username={username}
            />
          </div>
        )}
      </div>
    </>
  );
};

const LikedReviewPageWrapper = ({ params }: LikedReviewProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LikedReviewPage params={params} />
    </Suspense>
  );
};

export default LikedReviewPageWrapper;
