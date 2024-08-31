"use client";

import { getMovieReview } from "@/api/reviewUrl";
import MovieReview from "@/components/User/MovieReview";
import { MReview } from "@/types/type";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import "../../../../../../styles/film-details.scss";
import "../../../../../../styles/movie-review.scss";
import MovieReviewsPagination from "@/components/User/pagination/movieReview";
import Navbar from "@/components/User/Navbar/Navbar";
import Loading from "@/components/User/Loading/Loading";

interface MovieProp {
    params: { movieId: string };
}

const MovieReviews: React.FC<MovieProp> = ({ params }) => {
    const { movieId } = params;
    const searchParams = useSearchParams();
    const router = useRouter();

    const pageParam = searchParams.get("page");
    const initialPage = pageParam ? parseInt(pageParam, 10) : 1;

    const [reviewMovie, setReviewMovie] = useState<MReview[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(initialPage);
    const [perPage, setPerPage] = useState<number>(8); // Set items per page to 8
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const reviewData = await getMovieReview(movieId);
                setReviewMovie(reviewData.reviews || []);
                setTotalPages(Math.ceil(reviewData.reviews.length / perPage));
            } catch (error) {
                console.error("Error fetching reviews:", error);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [movieId, currentPage, perPage]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        router.push(`/film/${movieId}/reviews?page=${newPage}`);
    };

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const paginatedReviews = reviewMovie?.slice(start, end);

    return (
        <>
            <div className="movie-review-page">
                {loading ? (
                    <div>
                        <Loading/>
                    </div>
                ) : (
                        <div>
                            <div className="navbar">
                                <Navbar />
                            </div>
                        <div className="">
                            <h1 className="review-title">All Reviews</h1>
                            {reviewMovie.length > 0 ? (
        
                                <div className="review-grid">
                                    {reviewMovie.map((review) => (
                                        <MovieReview key={review._id} review={review} />
                                    ))}
                                </div>
        
                            ) : (<div className="no-review-div">
                                <p className="no-review-p">
                                    No reviews found.
                                </p>
                            </div>)}
                        </div>
                        <MovieReviewsPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            perPage={perPage}
                            onPageChange={handlePageChange}
                            movieId={movieId} 
                        />
                    </div>
                    
                )}
            </div>
        </>
    );
};

const MovieReviewsWrapper = ({ params }: MovieProp) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MovieReviews params={params} />
        </Suspense>
    );
};

export default MovieReviewsWrapper;
