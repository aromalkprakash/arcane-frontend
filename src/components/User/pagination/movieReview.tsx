"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "../../../styles/pagination.scss";

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    perPage: number;
    onPageChange: (newPage: number) => void;
    movieId: string; 
}

const MovieReviewsPagination: FC<PaginationControlsProps> = ({
    currentPage,
    totalPages,
    perPage,
    onPageChange,
    movieId, 
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (newPage: number) => {
        onPageChange(newPage);
        router.push(`/film/${movieId}/reviews?page=${newPage}`);
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

export default MovieReviewsPagination;
