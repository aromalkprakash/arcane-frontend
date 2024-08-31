import { likeReview } from "@/api/reviewUrl";
import { GetMe, updateLikedReviews } from "@/api/userUrl";
import { FReview } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { toast } from "sonner";
import "../../../styles/followingUsersReviews.scss";

interface FUR_All_ListProps {
  review: FReview;
}
const FUR_All_List_page: React.FC<FUR_All_ListProps> = ({ review }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await GetMe();
        if (userResponse && userResponse._id) {
          setUserId(userResponse._id);
          setLiked(review.review.likes.includes(userResponse._id));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [review.review.likes]);

  
  const handleLike = async () => {
    if (!userId) return;

    try {
      const action = liked ? 'unlike' : 'like';
      console.log(`Action: ${action}, Review ID: ${review.review._id}, User ID: ${userId}`);

      await likeReview(review.review._id, userId, action);
      await updateLikedReviews(review.review._id, userId, action);

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

  const isLongReview = review.review?.review.length > 100;

  return (
    <div key={review._id} className="review-item">
      <div className="container px-1 md:px-6">
        <div className="mb-8 md:mb-12"></div>
        <div className="grid gap-6">
          <div className="flex gap-4">
            <Link href={`/film/${review.movie?._id}`}>
              <div className="user-review-poster">
                <Image
                  src={review.movie?.poster}
                  alt={review.movie?.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full"
                />
              </div>
            </Link>
            <div className="movie-info">
              <div className="user-info">

                <Link href={`/profile/${review.user?.username}`}>
                  <div>
                    <img src={(review.user?.image || "/user.png")} alt="user avatar" className="avatar" />
                  </div>
                </Link>
              
                <Link href={`/profile/${review.user?.username}`}>
                  <h3 className="fullname">{review.user?.fullName}</h3>
                </Link>
           
              </div>
              <div>
                <Link href={`/film/${review.movie._id}`}>
                  <h1 className="movie-title">{review.movie?.title}</h1>
                </Link>
              </div>

              {review.review.rating > 0 && (
                <div className="rating-div">
                  <FaStar size={15} color="gold" /> <span className="review-rating">{review.review.rating}/10</span>
                </div>
              )}
              
              <p className="review-text">
                {isExpanded || !isLongReview ? review.review?.review : truncateText(review.review?.review, 100)}
              
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FUR_All_List_page;
