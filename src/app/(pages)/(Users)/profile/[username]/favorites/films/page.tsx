"use client";

import { favoriteMovieDetails } from '@/api/userUrl';
import AllMoviesList from "@/components/User/AllMovies/AllMovieList";
import Navbar from "@/components/User/Navbar/Navbar";
import { MovieT } from "@/types/type";
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { toast } from 'sonner';
import "../../../../../../../styles/allMovies.scss";
import FavoriteFilmsPagination from "@/components/User/pagination/favoriteFilm";
import Loading from "@/components/User/Loading/Loading";

interface FavoritePageProps {
  params: {
    username: string;
  };
}

const FavoriteFilmsPage: React.FC<FavoritePageProps> = ({ params }) => {
  const { username } = params;
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = searchParams.get("page");
  const initialPage = pageParam ? parseInt(pageParam, 10) : 1;

  const [movies, setMovies] = useState<MovieT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [perPage] = useState<number>(8); // Set items per page to 8
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchFollowers = async () => {
      setLoading(true);
      try {
        const data = await favoriteMovieDetails(username);
        setMovies(data.favoriteFilms);
        setTotalPages(Math.ceil(data.favoriteFilms.length / perPage));
      } catch (error) {
        console.error('Error fetching favorite films:', error);
        setError('Failed to load favorite films');
        toast.error('Failed to load favorite films');
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [username, perPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    router.push(`/profile/${username}/favorite/films?page=${newPage}`);
  };

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const paginatedFavorite = movies.slice(start, end);

  if (loading) {
    return <div><Loading/></div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (movies.length === 0) {
    return <p className="text-center font-normal text-2xl mt-6 mb-6">No followers found.</p>;
  }

  return (
    <div className="page">
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div>
          <Navbar />
          <h1 className="text-center font-normal text-2xl mt-6 mb-6">favorite films of {username}</h1>
          <div className="allmovies-grid">

            {paginatedFavorite.map((film) => (
              <AllMoviesList key={film._id} movie={film} />
            ))}
          </div>

          <FavoriteFilmsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            username={username}
          />
        </div>
      )}
    </div>
  );
};

const FollowersPageWrapper = ({ params }: FavoritePageProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FavoriteFilmsPage params={params} />
    </Suspense>
  );
};

export default FavoriteFilmsPage;
