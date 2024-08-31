"use client";

import { watchListDetails } from "@/api/userUrl";
import AllMoviesList from "@/components/User/AllMovies/AllMovieList";
import { MovieT } from "@/types/type";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import "../../../../../../styles/allMovies.scss";
import { useRouter, useSearchParams } from "next/navigation";
import WatchListPagination from "@/components/User/pagination/watchlist";
import Navbar from "@/components/User/Navbar/Navbar";
import Loading from "@/components/User/Loading/Loading";

interface watchListPageProps {
  params: {
    username: string;
  };
}

const AllMovies: React.FC<watchListPageProps> = ({ params }) => {
  const { username } = params;
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
        const data = await watchListDetails(username);
        console.log(data);
        setMovies(data.watchList);
        setTotalPages(Math.ceil(data.followers.length / perPage));
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [username, perPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    router.push(`/profile/${username}/watchlist?page=${newPage}`);
  };

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const paginatedWatchList = movies.slice(start, end);

  return (
    <div className="page">
      {loading ? (
        <div >
          <Loading />
        </div>
      ) : (
        <div>
          <Navbar />
          <h1 className="text-center font-normal text-2xl mt-6 mb-6">Watchlist of {username}</h1>
          <div className="allmovies-grid">
            {paginatedWatchList?.map((film) => (
              <AllMoviesList key={film._id} movie={film} />
            ))}
          </div>
        </div>
      )}

      <WatchListPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        username={username}
      />
    </div>
  );
};

export default AllMovies;
