import { MovieT } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import "../../../styles/allMovies.scss";
import { getMovieReview } from "@/api/reviewUrl";
import { IoStarSharp } from "react-icons/io5";

type Props = {
  movie: MovieT;
};

const AllMoviesList = ({ movie }: Props) => {
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewData = await getMovieReview(movie._id);
        if (reviewData) {
          setAverageRating(reviewData.averageRating !== undefined ? reviewData.averageRating : null);
        } else {
          setAverageRating(null);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [movie._id]);

  return (
    <div className="all-movies-container">
      <Link href={`/film/${movie._id}`}>
        <div className="p-t">
          <div className="poster">
            <Image
              src={movie?.poster}
              alt={movie?.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full h-full"
            />
          </div>
          <div className="details">
            <h1 className="allmovies-title">{movie.title}</h1>
            <h1 className="allmovies-dir">Directed by: <span className="dir-text">{movie.director}</span></h1>
            {averageRating !== null && (
              <div className="rating-div">
                <IoStarSharp size={15} color="gold" /> <span className="rating">{averageRating?.toFixed(1)}/10</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AllMoviesList;