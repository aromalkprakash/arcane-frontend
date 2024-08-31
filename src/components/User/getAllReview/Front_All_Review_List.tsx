import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "../../../styles/front-fur.scss";
import { FReview } from "@/types/type";

interface All_Review_ListProps {
  review: FReview;
}

const Front_All_Review_List: React.FC<All_Review_ListProps> = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const isLongReview = review.review?.length > 100;

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
                <Link href={`/film/${review.movie?._id}`}>
                  <h1 className="movie-title">{review.movie?.title}</h1>
                </Link>
              </div>
              {review.rating > 0 && (
                <div className="rating-div">
                  <FaStar size={15} color="gold" /> <span className="rating">{review.rating}/10</span>
                </div>
              )}
              <p className="review-text">
                {isExpanded || !isLongReview ? review.review : truncateText(review.review, 100)}
                {isLongReview && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="show-more-button"
                  >
                    {isExpanded ? 'Show less' : 'Show more'}
                  </button>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Front_All_Review_List;
