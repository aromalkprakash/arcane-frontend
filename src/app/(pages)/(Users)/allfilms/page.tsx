"use client";

import { getAllMovies } from "@/api/movieUrl";
import { MovieT } from "@/types/type";
import { Suspense, useEffect, useState } from "react";
import "../../../../styles/allMovies.scss";
import AllMoviesList from "@/components/User/AllMovies/AllMovieList";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import AllFilmsPagination from "@/components/User/pagination/allFilms";
import Navbar from "@/components/User/Navbar/Navbar";
import Loading from "@/components/User/Loading/Loading";


const AllMoviesPage = () => {

  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = searchParams.get("page");
  const initialPage = pageParam ? parseInt(pageParam, 10) : 1;

  const [movies, setMovies] = useState<MovieT[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [perPage] = useState<number>(8); // Set items per page to 8
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const MoviesList = await getAllMovies();
        console.log(MoviesList);
        setMovies(MoviesList);
        setTotalPages(Math.ceil(MoviesList.length / perPage));

      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [perPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    router.push(`/allfilms?page=${newPage}`);
  };

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const paginatedAllFilms = movies.slice(start, end);

  return (
    <div className="pt-1 pb-1 page">
      {loading ? (
        <div >
          <Loading />
        </div>
      ) : (
        <div>
          <Navbar />
          <h1 className="allfilms-heading">All films</h1>
          <div className="allmovies-grid">
            {paginatedAllFilms?.map!((film) => (
              <AllMoviesList key={film._id} movie={film} />
            ))}
          </div>
        </div>
      )}
      <AllFilmsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      
    </div>
  );
};


const All_MovieWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllMoviesPage />
    </Suspense>
  );
};

export default All_MovieWrapper;
