"use client";

import { getAllReview } from "@/api/reviewUrl";
import Loading from "@/components/User/Loading/Loading";
import Front_All_Review_List from "@/components/User/getAllReview/Front_All_Review_List";
import AllReviewsPaginationControls from "@/components/User/pagination/allReviews";
import { FReview } from "@/types/type";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import "../../../../../styles/followingUsersReviews.scss";
import All_Reviews_List_page from "@/components/User/getAllReview/All_Reviews_List_page";

const All_Reviews: React.FC = () => {
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
        const ReviewList = await getAllReview();
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
    router.push(`/all/reviews?page=${newPage}`);
  };

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const paginatedReviews = reviews?.slice(start, end);

  return (
    <>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="fu-review-page">
          <h1 className="following-review-title">All Reviews</h1>
          <div className="review-grid">
            {paginatedReviews?.map((review) => (
              <All_Reviews_List_page key={review.review._id} review={review} />
            ))}
          </div>
          <AllReviewsPaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            perPage={perPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

const All_ReviewsWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <All_Reviews />
    </Suspense>
  );
};

export default All_ReviewsWrapper;
