import { deleteReview, likeReview } from "@/api/reviewUrl";
import { GetMe, updateLikedReviews } from "@/api/userUrl";
import { UReview } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { FaHeart, FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import "../../styles/profile.scss";

interface ReviewProps {
  review: UReview;
}

const UserReview: React.FC<ReviewProps> = ({ review }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await GetMe();
        if (userResponse && userResponse._id) {
          setUserId(userResponse._id);
          // Check if the review is liked by the current user
          setLiked(review.likes.includes(userResponse._id));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [review.likes]);

  const handleLike = async () => {
    if (!userId) return;

    try {
      const action = liked ? 'unlike' : 'like'
      // Call Review Service
      await likeReview(review._id, userId, action);

      // Call User Service
      await updateLikedReviews(review._id, userId, action);

      setLiked(!liked);
      toast.success(`Review ${liked ? 'unliked' : 'liked'} successfully!`);
    } catch (error: any) {
      console.error('Error handling like/unlike:', error.response?.data || error.message);
      toast.error('Error handling like/unlike. Please try again.');
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const isLongReview = review.review.length > 100;

  const handleDelete = async () => {
    try {
      await deleteReview(review._id);
      toast.success('Review deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting review:', error.response?.data || error.message);
      toast.error('Error deleting review. Please try again.');
    }
  };

  return (
    <div key={review._id} className="review-item">
      <div className="mb-8 md:mb-12"></div>
      <div className="grid gap-6">
        <div className="flex gap-4">
          <Link href={`/film/${review.movie._id}`}>
            <div className="user-review-poster">
              <Image
                src={review.movie.poster}
                alt={review.movie.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-full"
              />
            </div>
          </Link>
          <div className="movie-info">
            <div className="">
              <Link href={`/film/${review.movie._id}`}>
                <h1 className="movie-title">{review.movie.title}</h1>
              </Link>
            </div>
              
            <div className="rating-div">
              <FaStar size={15} color="yellow" /> <span className="rating">{review.rating}/10</span>
            </div>
            <p className="review-text">
              {isExpanded || !isLongReview ? review?.review : truncateText(review?.review, 100)}
            
              {isLongReview && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="show-more-button"
                >
                  {isExpanded ? 'Show Less' : 'Show More'}
                </button>
              )}
            </p>
            <div className="icons">
              <FaHeart onClick={handleLike} className={`heart-icon ${liked ? 'liked' : ''}`} fill={liked ? 'red' : 'gray'} />
              <h1 className="like-text">{liked ? 'review liked' : 'Like'}</h1>

              {userId === review.userId && (
                <MdDelete onClick={handleDelete} />
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReview;