"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "../../../styles/pagination.scss";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  perPage: number;
  onPageChange: (newPage: number) => void;
  username: string;
}

const LikedReviewsPagination: FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  username,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
    router.push(`/profile/${username}/likedreviews?page=${newPage}`);
  };

  return (
    <div className="fr-pagination">
      {currentPage > 1 && (
        <button
          className="pagination-btn"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev Page
        </button>
      )}
      <div>
        {currentPage} / {totalPages}
      </div>
      {currentPage < totalPages && (
        <button
          className="pagination-btn"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next Page →
        </button>
      )}
    </div>
  );
};

export default LikedReviewsPagination;
