// MovieDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import '../css/MovieDetail.css';
import MediaCard from '../components/MediaCard';
import { useMovieContext } from '../contexts/MovieContext';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const movieData = await getMovieDetails(id);
                setMovie(movieData);

                // Fetch credits
                const creditsResponse = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                );
                const creditsData = await creditsResponse.json();
                setCast(creditsData.cast.slice(0, 10)); // Top 10 cast members
                setCrew(creditsData.crew);

                // Fetch recommendations
                const recResponse = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                );
                const recData = await recResponse.json();
                setRecommendations(recData.results.slice(0, 6)); // Top 6 recommendations

                setError(null);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch movie details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    const handleFavoriteClick = () => {
        if (!movie) return;
        
        if (isFavorite(movie.id)) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites({ 
                ...movie, 
                media_type: 'movie'
            });
        }
    };

    if (loading) {
        return <div className="loading">Loading movie details...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!movie) {
        return <div className="error">Movie not found</div>;
    }

    // Helper functions to get specific crew members
    const getDirectors = () => {
        return crew.filter(person => person.job === 'Director');
    };

    const getProducers = () => {
        return crew.filter(person => person.job === 'Producer');
    };

    const getWriters = () => {
        return crew.filter(person => person.job === 'Writer' || person.job === 'Screenplay');
    };

    const formatRuntime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const isFav = isFavorite(movie.id);

    return (
        <div className="movie-detail-container">
            {/* Backdrop and basic info */}
            <div className="movie-backdrop" style={{
                backgroundImage: movie.backdrop_path 
                    ? `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
                    : 'linear-gradient(135deg, #0f0f23, #1a1a2e)'
            }}>
                <div className="movie-poster-container">
                    <img 
                        src={movie.poster_path 
                            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` 
                            : '/placeholder-image.jpg'
                        } 
                        alt={movie.title} 
                        className="movie-poster"
                    />
                </div>
                
                <div className="movie-header-info">
                    <h1 className="movie-title">{movie.title}</h1>
                    <div className="movie-meta">
                        <span>{new Date(movie.release_date).getFullYear()}</span>
                        {movie.runtime > 0 && <span>{formatRuntime(movie.runtime)}</span>}
                        <span>{movie.vote_average.toFixed(1)}/10</span>
                        {movie.certification && <span>{movie.certification}</span>}
                    </div>
                    
                    <div className="movie-genres">
                        {movie.genres.map(genre => (
                            <span key={genre.id} className="genre-tag">{genre.name}</span>
                        ))}
                    </div>
                    
                    <button 
                        className={`favorite-btn ${isFav ? 'active' : ''} manrope-400`} 
                        onClick={handleFavoriteClick}
                    >
                        {isFav ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="movie-content">
                {/* Overview */}
                <section className="movie-section">
                    <h2>Overview</h2>
                    <p className="movie-overview">{movie.overview || 'No overview available.'}</p>
                </section>

                {/* Cast */}
                {cast.length > 0 && (
                    <section className="movie-section">
                        <h2>Cast</h2>
                        <div className="cast-grid">
                            {cast.map(person => (
                                <div key={person.id} className="cast-card">
                                    <img 
                                        src={person.profile_path 
                                            ? `https://image.tmdb.org/t/p/w200/${person.profile_path}` 
                                            : '/placeholder-actor.jpg'
                                        } 
                                        alt={person.name} 
                                    />
                                    <div className="cast-info">
                                        <h4>{person.name}</h4>
                                        <p>{person.character}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Crew */}
                <section className="movie-section">
                    <h2>Production Team</h2>
                    <div className="crew-info">
                        {getDirectors().length > 0 && (
                            <div className="crew-category">
                                <h3>Director{getDirectors().length > 1 ? 's' : ''}</h3>
                                <ul>
                                    {getDirectors().map(person => (
                                        <li key={person.id}>{person.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        {getProducers().length > 0 && (
                            <div className="crew-category">
                                <h3>Producer{getProducers().length > 1 ? 's' : ''}</h3>
                                <ul>
                                    {getProducers().map(person => (
                                        <li key={person.id}>{person.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        {getWriters().length > 0 && (
                            <div className="crew-category">
                                <h3>Writer{getWriters().length > 1 ? 's' : ''}</h3>
                                <ul>
                                    {getWriters().map(person => (
                                        <li key={person.id}>{person.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </section>

                {/* Additional Info */}
                <section className="movie-section">
                    <h2>Details</h2>
                    <div className="details-grid">
                        {movie.budget > 0 && (
                            <div className="detail-item">
                                <h3>Budget</h3>
                                <p>${movie.budget.toLocaleString()}</p>
                            </div>
                        )}
                        
                        {movie.revenue > 0 && (
                            <div className="detail-item">
                                <h3>Revenue</h3>
                                <p>${movie.revenue.toLocaleString()}</p>
                            </div>
                        )}
                        
                        {movie.production_companies.length > 0 && (
                            <div className="detail-item">
                                <h3>Production Companies</h3>
                                <div className="companies-list">
                                    {movie.production_companies.map(company => (
                                        <span key={company.id}>{company.name}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {movie.production_countries.length > 0 && (
                            <div className="detail-item">
                                <h3>Production Countries</h3>
                                <div className="countries-list">
                                    {movie.production_countries.map(country => (
                                        <span key={country.iso_3166_1}>{country.name}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {movie.spoken_languages.length > 0 && (
                            <div className="detail-item">
                                <h3>Spoken Languages</h3>
                                <div className="languages-list">
                                    {movie.spoken_languages.map(language => (
                                        <span key={language.iso_639_1}>{language.english_name}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Recommendations */}
                {recommendations.length > 0 && (
                    <section className="movie-section">
                        <h2>You Might Also Like</h2>
                        <div className="recommendations-grid">
                            {recommendations.map(rec => (
                                <MediaCard 
                                    key={`rec-${rec.id}`} 
                                    media={rec} 
                                    type="movie" 
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default MovieDetail;
