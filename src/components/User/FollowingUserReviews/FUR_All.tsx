import { useEffect, useState } from "react";
import FUR_All_List from "./FUR_All_List";
import "../../../styles/front-fur.scss";
import { getFollowingUsersReview } from "@/api/reviewUrl";
import { FReview } from "@/types/type";
import Link from "next/link";

const FUR_FrontPage: React.FC = () => {
  const [reviews, setReviews] = useState<FReview[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const ReviewList = await getFollowingUsersReview();
        console.log("Fetched reviews:", ReviewList);
        setReviews(ReviewList);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="front-fr">
      <div>
        {reviews && reviews?.length > 0 ? (
          <div>
            {loading ? (
              <div className="loader"></div>
            ) : (
              <div>
                <h1 className="following-review-title">Reviews by followers</h1>
                <div className="review-grid">
                  {reviews && reviews?.length > 0 ? (
                    reviews
                      .sort((a, b) => b.createdAt - a.createdAt)
                      .slice(0, 4)
                      .map((review) => (
                        <FUR_All_List key={review.review._id} review={review} />
                      ))
                  ) : (
                    <div>
                      <p className="text-center">No reviews found</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      {reviews && reviews?.length > 4 ? (
        <div className="rfmb">
          <button className="review-for-more">
            <Link href="/following/users/reviews">For more →</Link>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FUR_FrontPage;
