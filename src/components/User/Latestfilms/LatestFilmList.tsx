"use client";

import { MovieT } from "../../../types/type";
import Link from "next/link";
import React from "react";
import "../../../styles/posterhoover.scss"

type Props = {
  movie: MovieT;
};

const LatestFilmList = ({ movie }: Props) => {
  return (
    <Link href={`/film/${movie._id}`}>
      <div className="poster-gap">
        <div className="poster">
          <img
            src={movie.poster}
            alt={movie.title}
            
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full"
          />
          {/* <span className="tooltiptext">{movie.title}</span> */}
        </div>
      </div>
    </Link>
  );
};

export default LatestFilmList;
