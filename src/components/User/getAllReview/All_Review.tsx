import { useEffect, useState } from "react";
import "../../../styles/front-fur.scss";
import { getAllReview } from "@/api/reviewUrl";
import { FReview } from "@/types/type";
import Link from "next/link";
import All_Review_List from "./Front_All_Review_List";

const All_Review_Four: React.FC = () => {
  const [reviews, setReviews] = useState<FReview[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const ReviewList = await getAllReview();
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
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div>
          <h1 className="following-review-title">Latest Reviews</h1>
          <div className="review-grid">
            {reviews && reviews.length > 0 ? (
              reviews
                .sort((a, b) => b.createdAt - a.createdAt)
                .slice(0, 4)
                .map((review) => (
                  <All_Review_List key={review._id} review={review} />
                ))
            ) : (
              <div className="text-center">No reviews found</div>
            )}
          </div>
        </div>
      )}
      {reviews && reviews.length > 4 ? (
        <div className="rfmb">
          <button className="review-for-more">
            <Link href="/all/reviews">For more →</Link>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default All_Review_Four;
