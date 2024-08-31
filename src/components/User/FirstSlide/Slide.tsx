import React from 'react';
import { MovieT } from "@/types/type";
import "../../../styles/Slide.scss"

type Props = {
    movie: MovieT;
};

const Slide = ({ movie }: Props) => {
    return (
        <div>
            <img
                src={movie.bannerImg}
                alt={movie.title}
                className="slide-img"
            />
        </div>
    );
};

export default Slide;
