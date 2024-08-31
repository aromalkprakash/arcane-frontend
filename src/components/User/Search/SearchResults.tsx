import React, { useEffect } from 'react';
import Link from "next/link";
import { MovieT, User } from "@/types/type";
import { searchUser } from "@/api/userUrl";
import AllUsersList from "../AllUsers/AllUsersList";
import AllMoviesList from "../AllMovies/AllMovieList";
import Navbar from "../Navbar/Navbar";
import "../../../styles/search.scss";
import Loading from "../Loading/Loading";

interface SearchResultsPageProps {
  query: string;
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ query }) => {
    const [users, setUsers] = React.useState<User[]>([]);
    const [movies, setMovies] = React.useState<MovieT[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);
    const [filter, setFilter] = React.useState<string>('all');

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                const data = await searchUser(query);
                setUsers(data.users);
                setMovies(data.movies);
            } catch (err) {
                setError('Failed to fetch search results.');
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchResults();
        }
    }, [query]);

    if (loading) return <div><Loading/></div>;
    if (error) return <p>{error}</p>;

    return (
        <div className="pt-1 pb-1 page">
            {loading ? (<div>
                <Loading />
            </div>) : (
                <div>
                    <Navbar />
                    <div className="filter-button">
                        <button className={`mr-2 ${filter === 'all' ? 'active-filter' : ''} all-results-btn`} onClick={() => setFilter('all')}>
                            All Results
                        </button>
                        <button className={`mr-2 ${filter === 'users' ? 'active-filter' : ''} users-btn`} onClick={() => setFilter('users')}>
                            Users
                        </button>
                        <button className={`${filter === 'movies' ? 'active-filter' : ''} films-btn`} onClick={() => setFilter('movies')}>
                            Movies
                        </button>
                    </div>
                    {filter === 'all' || filter === 'users' ? (
                        <>
                            <h2 className="member-heading">Users</h2>
                            {users.length === 0 ? (
                                <p className="text-center">No users found.</p>
                            ) : (
                                <div className="allusers-grid">
                                    {users.map(user => (
                                        <Link href={`/profile/${user.username}`}>
                                            <AllUsersList key={user._id} user={user} />
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : null}
                    {filter === 'all' || filter === 'movies' ? (
                        <>
                            <h2 className="allfilms-heading">Movies</h2>
                            {movies.length === 0 ? (
                                <p className="text-center">No movies found.</p>
                            ) : (
                                <div className="allmovies-grid">
                                            
                                    {movies.map(film => (
                                        <Link href={`/film/${film._id}`}>
                                            <AllMoviesList key={film._id} movie={film} />
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default SearchResultsPage;
