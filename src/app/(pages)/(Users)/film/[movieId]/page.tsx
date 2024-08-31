"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSingleMovie } from '@/api/movieUrl';
import { MovieT, MReview } from '@/types/type';
import { GetMe, updateWatchList, updateFavorite } from '@/api/userUrl';
import MovieReview from '@/components/User/MovieReview';
import Image from 'next/image';
import "../../../../../styles/film-details.scss";
import { getMovieReview } from "@/api/reviewUrl";
import AddReviewDialog from "@/components/User/addReview/addReview";
import Link from "next/link";
import { BsStopwatchFill } from "react-icons/bs";
import { toast } from "sonner";
import { FaHeart } from "react-icons/fa";
import Navbar from "@/components/User/Navbar/Navbar";
import Loading from "@/components/User/Loading/Loading";

interface MovieProp {
  params: {
    movieId: string;
  };
}

const MovieDetails: React.FC<MovieProp> = ({ params }) => {
  const { movieId } = params;
  const [singleMovie, setSingleMovie] = useState<MovieT | null>(null);
  const [reviewMovie, setReviewMovie] = useState<MReview[]>([]);
  const [showFullActorsList, setShowFullActorsList] = useState(false);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [watchlist, setWatchlist] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movie = await getSingleMovie(movieId);
        setSingleMovie(movie);

        const reviewData = await getMovieReview(movieId);
        if (reviewData) {
          setReviewMovie(reviewData.reviews || []);
          setAverageRating(reviewData.averageRating !== undefined ? reviewData.averageRating : null);
        } else {
          setReviewMovie([]);
          setAverageRating(null);
        }

        const user = await GetMe();
        if (user.role === 'ADMIN') {
          setIsAdmin(true);
        }
        if (user.watchList && user.watchList.includes(movieId)) {
          setWatchlist(true);
        }
        if (user.favorites && user.favorites.includes(movieId)) {
          setFavorite(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [movieId, router]);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  const toggleWatchlist = async () => {
    if (!singleMovie) return;

    try {
      const user = await GetMe();
      if (!user) throw new Error("User not authenticated");

      const action = watchlist ? 'remove' : 'add';
      console.log(movieId, user._id, action);
      await updateWatchList(movieId, user._id, action);
      setWatchlist(!watchlist);
      toast.success(`Movie ${watchlist ? 'removed from' : 'added to'} watchlist!`);
    } catch (error) {
      console.error('Error updating watchlist:', error);
      toast.error('Error updating watchlist');
    }
  };

  const toggleFavorite = async () => {
    if (!singleMovie) return;

    try {
      const user = await GetMe();
      if (!user) throw new Error("User not authenticated");

      const action = favorite ? 'removeFromFavorite' : 'addToFavorite';
      console.log(movieId, user._id, action);
      await updateFavorite(movieId, user._id, action);
      setFavorite(!favorite);
      toast.success(`Movie ${favorite ? 'removed from' : 'added to'} favorites!`);
    } catch (error) {
      console.error('Error updating favorite:', error);
      toast.error('Error updating favorite');
    }
  };

  useEffect(() => {
    if (dialogOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [dialogOpen]);

  if (loading) {
    return <Loading/>;
  }

  if (!singleMovie) {
    return <p>Movie not found.</p>;
  }

  const displayDirectors = (directors: string[]): string => {
    if (!Array.isArray(directors)) {
      console.error('Expected an array of directors but received:', directors);
      return '';
    }
    return directors.join(", ");
  };

  const displayGenres = (genres: string[]): string => {
    if (!Array.isArray(genres)) {
      console.error('Expected an array of genres but received:', genres);
      return '';
    }
    return genres.join(", ");
  };
  const displayActors = (actors: string[]): React.ReactNode => {
    if (!Array.isArray(actors)) {
      console.error('Expected an array of cast but received:', actors);
      return '';
    }
  
    const actorsToDisplay = showFullActorsList ? actors : actors.slice(0, 5);
    return (
      <>
        {actorsToDisplay.map((actor, index) => (
          <React.Fragment key={index}>
            <span className="actor-name">{actor}</span>
            {index < actorsToDisplay.length - 1 && ', '}
          </React.Fragment>
        ))}
        {actors.length > 5 && (
          <span
            className="see-more"
            onClick={() => setShowFullActorsList(!showFullActorsList)}
            style={{ color: 'blue', cursor: 'pointer' }}
          >
            {showFullActorsList ? ' See Less' : ' See More'}
          </span>
        )}
      </>
    );
  };
  

  const bannerImg = singleMovie.bannerImg || "/defaultBanner.jpg";
  const posterImg = singleMovie.poster || "/defaultPoster.jpg";

  return (
    <div className="movie-details-bg">
      {loading ? (
        <div>
          <Loading/>
        </div>
      ) : (
        <div>
          <div className="navbar"><Navbar />
          </div>
      <div className="banner-container">
        <Image
          src={bannerImg}
          alt={singleMovie.title}
          layout="fill"
          objectFit="cover"
          className="banner-image"
        />
      </div>
      <div className="movie-details-content">
        <div className="poster-container">
          <Image
            src={posterImg}
            alt={singleMovie.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="movie-info">
          <h1 className="title-movie" style={{ zIndex: dialogOpen ? 0 : 1 }}>{singleMovie.title}</h1>
    
        <div  className="phone-poster-container">
          <Image
            src={posterImg}
            alt={singleMovie.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          </div>
   
          {averageRating !== null && (
                <div className="rating">
                  <h2 className="average-rating">Average Rating: {averageRating.toFixed(1)}</h2>
                </div>
              )}
              <div className="movie-detail-director">
                Directed by: <span className="dir">{displayDirectors(singleMovie.director)}</span>
              </div>
              
                <p className="description">{singleMovie.description}</p>
                
                <div className="movie-detail-genre">
                Genre: <span className="genre">{displayGenres(singleMovie.genre)}</span>
                </div>
                
              <div className="mt-3">
               <span className="release-yr">{singleMovie.releaseYear}</span> ‧ <span className="duration">{singleMovie.duration}</span>
                </div>
                
                <div className="movie-detail-cast">
                Actors: <span className="cast">{displayActors(singleMovie.actors)}</span>
                </div>
            </div>
            
        
        <div className="aae">
          <div className="addreview">
            <button onClick={openDialog} className="add-review-bt">Add Review</button>
            <AddReviewDialog isOpen={dialogOpen} onClose={closeDialog} movieId={movieId} />
          </div>
          
          {isAdmin && (
            <Link href={`/film/${movieId}/editfilm`}>
              <button className="edit-button">Edit Movie</button>
            </Link>
          )}
         
       
          <div className="icons">
            <BsStopwatchFill
              onClick={toggleWatchlist}
              size={25}
              className={`watchlist-icon ${watchlist ? 'in-watchlist' : ''}`} fill={watchlist ? 'green' : 'gray'}
            />

            <FaHeart
              onClick={toggleFavorite}
              size={25}
              className={`favorite-icon ${favorite ? 'favorite' : ''}`} fill={favorite ? 'orange' : 'gray'}
            />
          </div>
        </div>
      </div>
      
      <div className="movie-reviews-are">
        <h1 className="review-title">All Reviews</h1>
        {reviewMovie.length > 0 ? (
        
          <div className="review-grid">
            {reviewMovie
              .sort((a, b) => b.createdAt - a.createdAt)
              .slice(0, 4).map((review) => (
                <MovieReview key={review._id} review={review} />
              ))}
          </div>
        
        ) : (<div className="no-review-div">
          <p className="no-review-p">
            No reviews found.
          </p>
        </div>
        )}
      
        {reviewMovie.length > 4 ? (
          <div className="movie-review-more-div">
            <button className="movie-review-more">
              <Link href={`/film/${movieId}/reviews`}>
                view more →
              </Link>
            </button>
          </div>
        ) : ("")}
        
      </div></div>)}
     
    </div>
  );
};

export default MovieDetails;