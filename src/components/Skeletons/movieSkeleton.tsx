import React from 'react'
import "../../styles/posterhoover.scss"

const MovieSkeleton = () => {
  return (
    <div className="sk-poster">
      <div className="skeleton h-64 w-64" />
      <div className="skeleton h-64 w-64" />
      <div className="skeleton h-64 w-64" />
      <div className="skeleton h-64 w-64" />
      <div className="skeleton h-64 w-64" />
    </div>
  );
};

export default MovieSkeleton;