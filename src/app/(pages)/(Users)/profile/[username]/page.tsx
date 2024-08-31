"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserReview from "@/components/User/userReview";
import { authT, UReview } from "@/types/type";
import Image from "next/image";
import "../../../../../styles/profilePage.scss";
import { followUser, GetMe, GetUserDetails, unfollowUser, profilePageCounts } from "@/api/userUrl";
import { getUserReview } from "@/api/reviewUrl";
import Navbar from "@/components/User/Navbar/Navbar";
import Link from "next/link";
import FavoriteMovies from "@/components/User/FavoriteMovies/FavoriteMovie";
import Loading from "@/components/User/Loading/Loading";
import EditProfile from "@/components/User/EditProfile/EditProfile";

interface ProfileProp {
    params: { username: string };
}

const UserProfile: React.FC<ProfileProp> = ({ params }) => {
    const { username } = params;
    const router = useRouter();
    const [userProfile, setUserProfile] = useState<authT | null>(null);
    const [reviewUser, setReviewUser] = useState<UReview[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [authenticatedUser, setAuthenticatedUser] = useState<authT | null>(null);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [followUnfollowLoading, setFollowUnfollowLoading] = useState<boolean>(false);
    const [counts, setCounts] = useState({
        watchListCount: 0,
        favoritesCount: 0,
        likedReviewsCount: 0,
        followingCount: 0,
        followersCount: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const reviews = await getUserReview(username);
                setReviewUser(reviews);

                let data;
                if (username === "me") {
                    data = await GetMe();
                } else {
                    data = await GetUserDetails(username);
                }
                setUserProfile(data);

                if (authenticatedUser) {
                    const followingList = authenticatedUser.following.map((id: string) => id.toString());
                    setIsFollowing(followingList.includes(data._id.toString()));
                }

                // Fetch counts
                const userCounts = await profilePageCounts(username);
                setCounts(userCounts);

            } catch (error) {
                setError("Failed to fetch user data.");
            } finally {
                setLoading(false);
            }
        };

        // auth user
        const fetchAuthenticatedUser = async () => {
            try {
                const data = await GetMe();
                setAuthenticatedUser(data);
            } catch (error) {
                console.error("Failed to fetch authenticated user data.");
            }
        };

        if (username) {
            fetchData();
        }

        fetchAuthenticatedUser();
    }, [username, authenticatedUser]);

    // const getData = async () => {
    //     setLoading(true);
    //     try {
    //         const data = await favoriteMovieDetails(username);
    //         setMovies(data.favoriteFilms);
    //     } catch (error) {
    //         console.error("Error fetching movies:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // Follow/unfollow
    const handleFollowUnfollow = async () => {
        if (!authenticatedUser) return;

        setFollowUnfollowLoading(true);

        try {
            if (!authenticatedUser || !userProfile) return;
            if (isFollowing) {
                await unfollowUser(userProfile._id);
                setIsFollowing(false);
            } else {
                await followUser(userProfile._id);
                setIsFollowing(true);
            }
        } catch (error: any) {
            console.error("Error following/unfollowing user:", error.message);
        } finally {
            setFollowUnfollowLoading(false);
        }
    };

    if (loading) {
        return <div><Loading/></div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="bg">

            {loading ? (<div >
                <Loading />
            </div>) : (
                <div>
                <div className="navbar"><Navbar /></div>

                {userProfile?.coverImage ? (
                    <div className="banner-container">
                        <Image
                            src={userProfile?.coverImage}
                            alt={userProfile?.coverImage || "/banner.jpg"}
                            layout="fill"
                            objectFit="cover"
                            className="banner-image"
                        />

                        <div className="inside">
                            <div>
                                <img src={(userProfile?.image || "/user.png")} alt="user avatar" className="avatar" />
                            </div>
                            <div className="u-b">
                                <h1 className="username">{userProfile?.fullName}</h1>
                                <div>
                                    <p className="bio">{userProfile?.bio}</p>
                                </div>
                            </div>
                            <span>
                                {authenticatedUser && authenticatedUser.username === username && (
                                        <EditProfile/>
                                )}

                                {authenticatedUser && authenticatedUser.username !== username && (
                                    <button
                                        className="fu-btn"
                                        onClick={handleFollowUnfollow}
                                        disabled={followUnfollowLoading}
                                    >
                                        {followUnfollowLoading ? "Loading..." : isFollowing ? "Unfollow" : "Follow"}
                                    </button>
                                )}
                            </span>

         

                            {/* Display counts */}
                            <div className="counts-div">
                                {authenticatedUser && authenticatedUser.username === username && (
                                    <>
                                        <Link href={`/profile/${username}/watchlist`}>
                                            <div className="text-center">
                                                <p className="count-number">{counts.watchListCount}</p>
                                                <p className="count-text">Watchlist</p>
                                            </div>
                                        </Link>
                                        <Link href={`/profile/${username}/likedreviews`}>
                                            <div className="text-center">
                                                <p className="count-number">{counts.likedReviewsCount}</p>
                                                <p className="count-text">Liked Reviews</p>
                                            </div>
                                        </Link>
                                    </>
                                )}
                                <Link href={`/profile/${username}/followingusers`}>
                                    <div className="text-center">
                                        <p className="count-number">{counts.followingCount}</p>
                                        <p className="count-text">Following</p>
                                    </div>
                                </Link>
                                <Link href={`/profile/${username}/followers`}>
                                    <div className="text-center">
                                        <p className="count-number">{counts.followersCount}</p>
                                        <p className="count-text">Followers</p>
                                    </div>
                                </Link>
                                <Link href={`/profile/${username}/favorite`}>
                                    <div className="text-center">
                                        <p className="count-number">{counts.favoritesCount}</p>
                                        <p className="count-text">Favorites</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="if-no-banner">
                        <div>
                            <img src={(userProfile?.image || "/user.png")} alt="user avatar" className="avatar" />
                        </div>
                        <div className="u-b">
                            <h1 className="username">{userProfile?.fullName}</h1>
                            <div>
                                <p className="bio">{userProfile?.bio}</p>
                            </div>
                        </div>
                        <span>
                            {authenticatedUser && authenticatedUser.username === username && (
                                <button
                                    className="pp-edit-btn"
                                    onClick={() => router.push('/setting')}
                                >
                                    Edit Profile
                                </button>
                            )}

                            {authenticatedUser && authenticatedUser.username !== username && (
                                <button
                                    className="fu-btn"
                                    onClick={handleFollowUnfollow}
                                    disabled={followUnfollowLoading}
                                >
                                    {followUnfollowLoading ? "Loading..." : isFollowing ? "Unfollow" : "Follow"}
                                </button>
                            )}
                        </span>
                        {/* Display counts */}
                        <div className="counts-div">
                            {authenticatedUser && authenticatedUser.username === username && (
                                <>
                                    <Link href={`/profile/${username}/watchlist`}>
                                        <div className="text-center">
                                            <p className="count-number">{counts.watchListCount}</p>
                                            <p className="count-text">Watchlist</p>
                                        </div>
                                    </Link>
                                    <Link href={`/profile/${username}/likedreviews`}>
                                        <div className="text-center">
                                            <p className="count-number">{counts.likedReviewsCount}</p>
                                            <p className="count-text">Liked Reviews</p>
                                        </div>
                                    </Link>
                                </>
                            )}
                            <Link href={`/profile/${username}/followingusers`}>
                                <div className="text-center">
                                    <p className="count-number">{counts.followingCount}</p>
                                    <p className="count-text">Following</p>
                                </div>
                            </Link>
                            <Link href={`/profile/${username}/followers`}>
                                <div className="text-center">
                                    <p className="count-number">{counts.followersCount}</p>
                                    <p className="count-text">Followers</p>
                                </div>
                            </Link>
                            <Link href={`/profile/${username}/favorite`}>
                                <div className="text-center">
                                    <p className="count-number">{counts.favoritesCount}</p>
                                    <p className="count-text">Favorites</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}


                {/* //phone size */}

                <div className="phone-size">
                    <div>
                        <img src={(userProfile?.image || "/user.png")} alt="user avatar" className="avatar" />
                    </div>
                    <div className="u-b">
                        <h1 className="username">{userProfile?.fullName}</h1>
                        <div>
                            <p className="bio">{userProfile?.bio}</p>
                        </div>
                    </div>
                    <span>
                        {authenticatedUser && authenticatedUser.username === username && (
                            <button
                                className="pp-edit-btn"
                                onClick={() => router.push('/setting')}
                            >
                                Edit Profile
                            </button>
                        )}

                        {authenticatedUser && authenticatedUser.username !== username && (
                            <button
                                className="fu-btn"
                                onClick={handleFollowUnfollow}
                                disabled={followUnfollowLoading}
                            >
                                {followUnfollowLoading ? "Loading..." : isFollowing ? "Unfollow" : "Follow"}
                            </button>
                        )}
                    </span>
    
  
                </div>
                <div className="phone-counts-div">
                    {authenticatedUser && authenticatedUser.username === username && (
                        <>
                            <Link href={`/profile/${username}/watchlist`}>
                                <div className="text-center">
                                    <p className="count-number">{counts.watchListCount}</p>
                                    <p className="count-text">Watchlist</p>
                                </div>
                            </Link>
                            <Link href={`/profile/${username}/likedreviews`}>
                                <div className="text-center">
                                    <p className="count-number">{counts.likedReviewsCount}</p>
                                    <p className="count-text">Liked Reviews</p>
                                </div>
                            </Link>
                        </>
                    )}
                    <Link href={`/profile/${username}/followingusers`}>
                        <div className="text-center">
                            <p className="count-number">{counts.followingCount}</p>
                            <p className="count-text">Following</p>
                        </div>
                    </Link>
                    <Link href={`/profile/${username}/followers`}>
                        <div className="text-center">
                            <p className="count-number">{counts.followersCount}</p>
                            <p className="count-text">Followers</p>
                        </div>
                    </Link>
                    <Link href={`/profile/${username}/favorite`}>
                        <div className="text-center">
                            <p className="count-number">{counts.favoritesCount}</p>
                            <p className="count-text">Favorites</p>
                        </div>
                    </Link>
                </div>

                <FavoriteMovies params={{ username }} />

                <h2 className="review-heading">Reviews by {username}</h2>

                {reviewUser?.length > 0 ? (
                    <div className="review-main">
                        <div className="userpp-review-grid">
                            {reviewUser
                                .sort((a, b) => b.createdAt - a.createdAt)
                                .slice(0, 4)
                                .map((review) => (
                                    <UserReview key={review._id} review={review} />
                                ))}
                        </div>
                    </div>
                ) : (
                    <div className="no-review-div">
                        <p className="no-review-p">No reviews found.</p>
                    </div>
                )}

                {reviewUser?.length > 4 && (
                    <div className="userpp-review-more-div">
                        <button className="userpp-review-more">
                            <Link href={`/profile/${username}/reviews`}>view more →</Link>
                        </button>
                    </div>
                )}
            </div>)}

           
        </div>
    );
};

export default UserProfile;
