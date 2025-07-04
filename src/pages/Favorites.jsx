import React, { useState } from 'react'
import '../css/Favorites.css'
import { useMovieContext } from '../contexts/MovieContext'
import MediaCard from '../components/MediaCard'
import { multiSearch } from '../services/api'

const Favorites = () => {
    const { favorites, isFavorite } = useMovieContext()
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [searchMode, setSearchMode] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Separate favorites into movies and TV shows
    const favoriteMovies = favorites.filter(item => item.media_type === 'movie' || !item.media_type)
    const favoriteTVShows = favorites.filter(item => item.media_type === 'tv')

    const hasFavorites = favorites.length > 0
    const hasMovies = favoriteMovies.length > 0
    const hasTVShows = favoriteTVShows.length > 0

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) {
            setSearchMode(false)
            setSearchResults([])
            return
        }
        if (loading) return

        setLoading(true)
        setSearchMode(true)
        try {
            const results = await multiSearch(searchQuery)
            // Filter results to only include movies and TV shows with posters
            const filteredResults = results.filter(item => 
                item.poster_path && (item.media_type === 'movie' || item.media_type === 'tv')
            )
            setSearchResults(filteredResults)
            setError(null)
        } catch (err) {
            console.error(err)
            setError("Failed to search favorites")
        } finally {
            setLoading(false)
        }
    }

    const clearSearch = () => {
        setSearchQuery("")
        setSearchResults([])
        setSearchMode(false)
    }

    // Categorize search results
    const categorizeResults = (results) => {
        const favorites = {
            movies: [],
            tvShows: []
        }
        const others = {
            movies: [],
            tvShows: []
        }

        results.forEach(item => {
            if (isFavorite(item.id)) {
                if (item.media_type === 'movie') {
                    favorites.movies.push(item)
                } else {
                    favorites.tvShows.push(item)
                }
            } else {
                if (item.media_type === 'movie') {
                    others.movies.push(item)
                } else {
                    others.tvShows.push(item)
                }
            }
        })

        return { favorites, others }
    }

    if (!hasFavorites && !searchMode) {
        return (
            <div className='favorites-empty'>                
                {/* Search form for empty favorites state */}
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        className="search-input manrope-500"
                        placeholder="Search for movies or TV shows..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className='search-button manrope-500'>Search</button>
                </form>
                
                <h1>No favorites yet</h1>
                <p>Start adding movies and TV shows to your favorites and they will appear here.</p>
            </div>
        )
    }

    return (
        <div className='favorites'>
            {/* Search form */}
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    className="search-input manrope-500"
                    placeholder="Search in favorites..."
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
            {loading && <div className="loading">Searching...</div>}

            {searchMode ? (
                <>
                    {searchResults.length > 0 ? (
                        <>
                            {/* Categorize search results */}
                            {(() => {
                                const { favorites: favResults, others: otherResults } = categorizeResults(searchResults)
                                
                                return (
                                    <>
                                        {/* Favorites section */}
                                        {(favResults.movies.length > 0 || favResults.tvShows.length > 0) && (
                                            <>
                                            <section className="search-results-section">
                                                <h1 className="section-title">In Your Favorites</h1>
                                                
                                                {favResults.movies.length > 0 && (
                                                    <>
                                                        <h2 className="subsection-title">Movies</h2>
                                                        <div className="media-grid">
                                                            {favResults.movies.map(movie => (
                                                                <MediaCard 
                                                                    key={`fav-movie-${movie.id}`}
                                                                    media={movie}
                                                                    type="movie"
                                                                />
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                                
                                                {favResults.tvShows.length > 0 && (
                                                    <>
                                                        <h2 className="subsection-title">TV Shows</h2>
                                                        <div className="media-grid">
                                                            {favResults.tvShows.map(show => (
                                                                <MediaCard 
                                                                    key={`fav-tv-${show.id}`}
                                                                    media={show}
                                                                    type="tv"
                                                                />
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </section><hr className='hr'/>
                                            </>
                                        )}
                                        
                                        {/* Others section */}
                                        {(otherResults.movies.length > 0 || otherResults.tvShows.length > 0) && (
                                            <><section className="search-results-section">
                                                <h1 className="section-title">Other Results</h1>
                                                
                                                {otherResults.movies.length > 0 && (
                                                    <>
                                                        <h2 className="subsection-title">Movies</h2>
                                                        <div className="media-grid">
                                                            {otherResults.movies.map(movie => (
                                                                <MediaCard 
                                                                    key={`other-movie-${movie.id}`}
                                                                    media={movie}
                                                                    type="movie"
                                                                />
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                                
                                                {otherResults.tvShows.length > 0 && (
                                                    <>
                                                        <h2 className="subsection-title">TV Shows</h2>
                                                        <div className="media-grid">
                                                            {otherResults.tvShows.map(show => (
                                                                <MediaCard 
                                                                    key={`other-tv-${show.id}`}
                                                                    media={show}
                                                                    type="tv"
                                                                />
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </section><hr className='hr'/></>
                                        )}
                                    </>
                                )
                            })()}
                        </>
                    ) : (
                        <div className="no-results">No results found for your search.</div>
                    )}
                </>
            ) : (
                <>
                    {/* Regular favorites display when not searching */}
                    {hasMovies && (
                        <><section className="favorites-section">
                            <h1 className="section-title">Favorite Movies</h1>
                            <div className="media-grid">
                                {favoriteMovies.map((movie) => (
                                    <MediaCard 
                                        key={`movie-${movie.id}`} 
                                        media={movie} 
                                        type="movie" 
                                    />
                                ))}
                            </div>
                        </section><hr className='hr'/></>
                    )}

                    {hasTVShows && (
                        <><section className="favorites-section">
                            <h1 className="section-title">Favorite TV Shows</h1>
                            <div className="media-grid">
                                {favoriteTVShows.map((show) => (
                                    <MediaCard 
                                        key={`tv-${show.id}`} 
                                        media={show} 
                                        type="tv" 
                                    />
                                ))}
                            </div>
                        </section><hr className='hr'/></>
                    )}
                </>
            )}
        </div>
    )
}

export default Favorites
