import { getAllMovies } from "@/api/movieUrl";
import React, { useEffect, useState } from 'react'
import { MovieT } from "@/types/type";
import Slide from "./Slide";
import "../../../styles/Slide.scss"

const FirstSlide = () => {
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
        <div className="first-slide">
            {loading ? (
                <div>Loading...</div>
            ) : movies && movies.length > 0 ? (
                movies.map((film) => (
                    <div className="slide" key={film._id}>
                        <Slide movie={film} />
                    </div>
                ))
            ) : (
                <div>No movies found</div>
            )}
        </div>
    )
};

export default FirstSlide;
