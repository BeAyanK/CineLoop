import React from 'react'
import MediaCard from '../components/MediaCard'
import { useState, useEffect } from 'react'
import { getTrendingMovies, getTrendingTVShows, multiSearch } from '../services/api'
import '../css/Home.css'
import '../css/MediaGridPage.css'

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingTVShows, setTrendingTVShows] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchMode, setSearchMode] = useState(false);

    useEffect(() => {
        const loadTrendingContent = async () => {
            try {
                const [movies, tvShows] = await Promise.all([
                    getTrendingMovies(),
                    getTrendingTVShows()
                ]);

                setTrendingMovies(movies.slice(0, 15));
                setTrendingTVShows(tvShows.slice(0, 15));
                setError(null);
            } catch (error) {
                console.error(error);
                setError("Failed to fetch trending content. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadTrendingContent();
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
            const results = await multiSearch(searchQuery);
            // Filter out results that don't have a poster and aren't movies or tv shows
            const filteredResults = results.filter(item =>
                item.poster_path && (item.media_type === 'movie' || item.media_type === 'tv')
            );
            setSearchResults(filteredResults);
            setError(null);
        } catch (error) {
            console.log(error);
            setError("Failed to search movies and TV shows...");
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
        <div className='home media-grid-page'>
            <p className="tagline manrope-400">Your Gateway to Cinematic Discovery</p>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    className="search-input manrope-500"
                    placeholder="Search for movies or TV shows..."
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
                    {searchResults.length > 0 ? (
                        <div className="movies-grid">
                            {searchResults.map((item) => (
                                <MediaCard
                                    key={`${item.media_type}-${item.id}`}
                                    media={item}
                                    type={item.media_type}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">No movies or TV shows found for your search.</div>
                    )}
                </>
            ) : (
                <>
                    {/* Trending Movies Section */}
                    <> <section className="movie-section">
                        <h1 className='manrope-700'>Trending Movies This Week</h1>
                        <div className="movies-grid">
                            {trendingMovies.length > 0 ? (
                                trendingMovies.map((movie) => (
                                    <MediaCard key={`trending-movie-${movie.id}`} media={movie} type="movie" />
                                ))
                            ) : (
                                <div className="no-results">No trending movies available.</div>
                            )}
                        </div>
                    </section><hr className='hr'/></>

                    {/* Trending TV Shows Section */}
                    <><section className="movie-section">
                        <h1 className='manrope-700'>Trending TV Shows This Week</h1>
                        <div className="movies-grid">
                            {trendingTVShows.length > 0 ? (
                                trendingTVShows.map((show) => (
                                    <MediaCard
                                        key={`trending-tv-${show.id}`}
                                        media={show}
                                        type="tv"
                                    />
                                ))
                            ) : (
                                <div className="no-results">No trending TV shows available.</div>
                            )}
                        </div>
                    </section><hr className='hr' /></>
                </>
            )}
        </div>
    )
}

export default Home
