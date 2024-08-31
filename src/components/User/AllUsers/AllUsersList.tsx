import { User } from "@/types/type";
import Link from "next/link";
import "../../../styles/AllUsers.scss";
import { useEffect, useState } from "react";
import { profilePageCounts } from "@/api/userUrl";

type Props = {
  user: User;
};

const AllUsersList = ({ user }: Props) => {
  const [counts, setCounts] = useState({
    watchListCount: 0,
    favoritesCount: 0,
    likedReviewsCount: 0,
    followingCount: 0,
    followersCount: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const userCounts = await profilePageCounts(user.username);
      setCounts(userCounts);
    };
    fetchData();
  }, [user.username]);

  return (
    <div className="allusers-page">
      <div className="items">
        
        <Link href={`/profile/${user.username}`}>
          <div className="a-n">
          <img src={(user?.image || "/user.png")} alt="user avatar" className="avatar" />
          <span className="n">{user.fullName}</span>
       </div>
          </Link>
       
      <div className="users-count-div">
        <Link href={`/profile/${user.username}/followingusers`}>
          <div className="text-center">
            <p className="count-number">{counts.followingCount}</p>
            <p className="count-text">Following</p>
          </div>
        </Link>
        <Link href={`/profile/${user.username}/followers`}>
          <div className="text-center">
            <p className="count-number">{counts.followersCount}</p>
            <p className="count-text">Followers</p>
          </div>
        </Link>
        <Link href={`/profile/${user.username}/favorite`}>
          <div className="text-center">
            <p className="count-number">{counts.favoritesCount}</p>
            <p className="count-text">Favorites</p>
          </div>
        </Link>
        </div>
        </div>
      {/* <hr className="hr-line"/> */}
    </div>
  );
};

export default AllUsersList;