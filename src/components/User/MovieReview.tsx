import { deleteReview, likeReview } from "@/api/reviewUrl";
import { GetMe, updateLikedReviews } from "@/api/userUrl";
import { MReview } from '@/types/type';
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { FaHeart, FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import "../../styles/movie-review.scss";

interface ReviewProps {
  review: MReview;
}

const MovieReview: React.FC<ReviewProps> = ({ review }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await GetMe();
        if (userResponse && userResponse._id) {
          setUserId(userResponse._id);
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
      const action = liked ? 'unlike' : 'like';
      await likeReview(review._id, userId, action);
      await updateLikedReviews(review._id, userId, action);

      setLiked(!liked);
      toast.success(`Review ${liked ? 'unliked' : 'liked'} successfully!`);
    } catch (error: any) {
      console.error('Error handling like/unlike:', error.message);
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
      <div className="container">
        {/* <div className="mb-8"></div> */}
        <div className="container-2">
            
          <div className="user-info">
            <Link href={`/profile/${review.user?.username}`}>
              <div>
                <img src={(review.user?.image || "/user.png")} alt="user avatar" className="avatar" />
              </div>
            </Link>
            <div className="user-details">
              <Link href={`/profile/${review.user?.username}`}>
                <h3 className="user-fullname">{review.user?.fullName}</h3>
              </Link>
            </div>
          </div>
          
          <div className="movie-info">

            <div className="rating-div">
              <FaStar size={15} color="yellow" /> <span className="rating">{review.rating}/10</span>
            </div>
              
            <p className="review-text">
              {isExpanded || !isLongReview ? review.review : truncateText(review.review, 100)}
              
              {isLongReview && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="show-more-button"
                >
                  {isExpanded ? 'show less' : 'show more'}
                </button>
              )}
            </p>
            <div className="icons">
              <FaHeart onClick={handleLike} className={`heart-icon ${liked ? 'liked' : ''}`} fill={liked ? 'red' : 'gray'} />
              <h1 className="like-text">{liked ? 'remove like' : 'Like review'}</h1>

              {userId === review.userId && (
                <MdDelete onClick={handleDelete} color="" />
              )}
            </div>
          </div>
          {/* <Separator /> */}
        </div>
      </div>
    </div>
  );
};

export default MovieReview;