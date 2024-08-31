"use client";

import { useEffect, useState } from "react";
import { MovieT } from "@/types/type";
import "../../../styles/favoriteMovie.scss";
import LatestFilmList from "../Latestfilms/LatestFilmList";
import { favoriteMovieDetails } from "@/api/userUrl";
import Loading from "../Loading/Loading";

interface FavoriteMoviePageProps {
    params: {
        username: string;
    };
}

const FavoriteMovies: React.FC<FavoriteMoviePageProps> = ({ params }) => {
    const { username } = params;

    const [movies, setMovies] = useState<MovieT[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const data = await favoriteMovieDetails(username);
                setMovies(data.favoriteFilms);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [username]);

    return (
        <div className="fav-films pt-1 pb-1">
            {movies && movies?.length > 0 ? (
                <>
                    <h1 className="fav-films-h1">Favorite films of {username}</h1>
                    <div className="fav-films-grid">
                        {movies && movies.length > 0 ? (
                            movies.slice(0, 8).map((film) => (
                                <LatestFilmList key={film._id} movie={film} />
                            ))
                        ) : (
                            <div className="not-found">No movies found.</div>
                        )}
                    </div>
                </>
                
            ) : (
                ""
            )}
        </div>
    );
};

export default FavoriteMovies;
