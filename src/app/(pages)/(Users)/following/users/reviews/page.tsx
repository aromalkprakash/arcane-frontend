"use client";

import { Suspense, useEffect, useState } from "react";
import { getFollowingUsersReview } from "@/api/reviewUrl";
import { FReview } from "@/types/type";
import "../../../../../../styles/followingUsersReviews.scss";
import { useSearchParams, useRouter } from "next/navigation";
import PaginationControls from "@/components/User/pagination/pagination";
import Loading from "@/components/User/Loading/Loading";
import FUR_All_List_page from "@/components/User/FollowingUserReviews/FUR_List_Page";

const FUR_All: React.FC = () => {
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
        const ReviewList = await getFollowingUsersReview();
        setReviews(ReviewList);
        setTotalPages(Math.ceil(ReviewList.length / perPage));
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [currentPage, perPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    router.push(`/following/users/reviews?page=${newPage}`);
  };

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const paginatedReviews = reviews?.slice(start, end);

  return (
    <div className="pt-1 pb-1 page">
      {loading ? (
        <div><Loading/></div>
      ) : (
        <div className="fu-review-page">
          <h1 className="following-review-title">Reviews by followers</h1>
          <div className="review-grid">
            {paginatedReviews?.map((review) => (
              <FUR_All_List_page key={review.review._id} review={review} />
            ))}
          </div>
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            perPage={perPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

const FUR_AllWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FUR_All />
    </Suspense>
  );
};

export default FUR_AllWrapper;
