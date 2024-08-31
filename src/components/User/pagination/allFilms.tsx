"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import "../../../styles/pagination.scss";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const AllFilmsPagination: FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
    router.push(`/allfilms?page=${newPage}`);
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

export default AllFilmsPagination;
