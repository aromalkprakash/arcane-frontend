"use client";

import LatestFilms from "@/components/User/Latestfilms/LatestFilms";
import Navbar from "@/components/User/Navbar/Navbar";
import "../styles/home.scss";
import FUR_FrontPage from "@/components/User/FollowingUserReviews/FUR_All";
import { useEffect, useState } from "react";
import { GetMe } from "@/api/userUrl";
import Footer from "@/components/User/footer/Footer";
import Loading from "@/components/User/Loading/Loading";
import All_Review_Four from "@/components/User/getAllReview/All_Review";

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await GetMe();
        setUser(userData);
      } catch (error) {
        // console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />; // Display loader while components are loading
  }

  return (
    <div className="home">
      <div className="navbar">
        <Navbar />
      </div>
      <video
        autoPlay
        loop
        muted
        className="video-background"
        src="/video/mainAh.mp4"
      />
      <div className="v-h1-div">
        <h1 className="v-h1">
          We believe every <span className="v-h-span">opinion</span> is worth
          sharing
        </h1>
      </div>
      <LatestFilms />
      <All_Review_Four />
      {user ? <FUR_FrontPage /> : ""}
      <Footer />
    </div>
  );
};

export default Home;
