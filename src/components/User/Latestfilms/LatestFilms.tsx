"use client";

import { useEffect, useState } from "react";
import { getAllMovies } from "@/api/movieUrl";
import { MovieT } from "@/types/type";
import LatestFilmList from "./LatestFilmList";
import "../../../styles/LatestFilms.scss";


const LatestFilms: React.FC = () => {
  const [movies, setMovies] = useState<MovieT[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const MoviesList = await getAllMovies();
        console.log(MoviesList);
        setMovies(MoviesList);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="popular-films pt-1 pb-1">
     
      {loading ? (
        <div >
            {/* <MovieSkeleton /> */}
        </div>
        
      ) : (
          <>
            <h1 className="latest-films-h1">Popular films</h1>
            {/* <hr className="h1-hr"/> */}
          <div className="latestfilms-grid">
          {movies && movies.length > 0 ? (
            movies
              .sort((a, b) => b.releaseYear - a.releaseYear)
              .slice(0, 8)
              .map((film) => (
                <LatestFilmList key={film._id} movie={film} />
              ))
          ) : (
            <div>No movies found</div>
          )}
        </div></>
      )}
    </div>
  );
};

export default LatestFilms;
