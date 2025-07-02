import React from 'react'
import MovieCard from '../components/MovieCard'
import { useState, useEffect } from 'react'
import { searchMovies, getPopularMovies, getNowPlayingMovies, getUpcomingMovies, getTopRatedMovies } from '../services/api'
import '../css/Home.css'

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchMode, setSearchMode] = useState(false);

    useEffect(() => {
        const loadAllMovies = async () => {
            try {
                const [popular, nowPlaying, upcoming, topRated] = await Promise.all([
                    getPopularMovies(),
                    getNowPlayingMovies(),
                    getUpcomingMovies(),
                    getTopRatedMovies()
                ]);

                setPopularMovies(popular);
                setNowPlayingMovies(nowPlaying);
                setUpcomingMovies(upcoming);
                setTopRatedMovies(topRated);
                setError(null);
            } catch (error) {
                console.error(error);
                setError("Failed to fetch movies. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadAllMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setSearchMode(false);
            setSearchResults([]);
            return;
        }
        if (loading) return;

        setLoading(true);
        setSearchMode(true);
        try {
            const results = await searchMovies(searchQuery);
            setSearchResults(results);
            setError(null);
        } catch (error) {
            console.log(error);
            setError("Failed to search movies...");
        } finally {
            setLoading(false);
        }
    }

    const clearSearch = () => {
        setSearchQuery("");
        setSearchResults([]);
        setSearchMode(false);
    }

    if (loading) {
        return (
            <div className='home'>
                <div className="loading">Loading...</div>
            </div>
        );
    }

    return (
        <div className='home'>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    className="search-input manrope-500"
                    placeholder="Search for a movie..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className='search-button manrope-500'>Search</button>
                {searchMode && (
                    <button type="button" onClick={clearSearch} className='clear-button manrope-500'>
                        Clear
                    </button>
                )}
            </form>

            {error && <div className="error">{error}</div>}

            {searchMode ? (
                <>
                    <h1 className='manrope-700'>Search Results for "{searchQuery}"</h1>
                    <div className="movies-grid">
                        {searchResults.length > 0 ? (
                            searchResults.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))
                        ) : (
                            <div className="no-results">No movies found for your search.</div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    {/* Popular Movies Section */}
                    <section className="movie-section">
                        <h1 className='manrope-700'>Popular Movies</h1>
                        <div className="movies-grid">
                            {popularMovies.slice(0, 10).map((movie) => (
                                <MovieCard key={`popular-${movie.id}`} movie={movie} />
                            ))}
                        </div>
                    </section>

                    {/* Now Playing Movies Section */}
                    <section className="movie-section">
                        <h1 className='manrope-700'>Now in Cinemas</h1>
                        <div className="movies-grid">
                            {nowPlayingMovies.slice(0, 8).map((movie) => (
                                <MovieCard key={`now-playing-${movie.id}`} movie={movie} />
                            ))}
                        </div>
                    </section>

                    {/* Top Rated Movies Section */}
                    <section className="movie-section">
                        <h1 className='manrope-700'>Top Rated</h1>
                        <div className="movies-grid">
                            {topRatedMovies.slice(0, 8).map((movie) => (
                                <MovieCard key={`top-rated-${movie.id}`} movie={movie} />
                            ))}
                        </div>
                    </section>

                    {/* Upcoming Movies Section */}
                    <section className="movie-section">
                        <h1 className='manrope-700'>Upcoming Movies</h1>
                        <div className="movies-grid">
                            {upcomingMovies.slice(0, 8).map((movie) => (
                                <MovieCard key={`upcoming-${movie.id}`} movie={movie} />
                            ))}
                        </div>
                    </section>
                </>
            )}
        </div>
    )
}

export default Home
