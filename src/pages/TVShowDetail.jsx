// TVShowDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTVShowDetails } from '../services/api';
import '../css/TVShowDetail.css';
import MediaCard from '../components/MediaCard';
import { useMovieContext } from '../contexts/MovieContext';

const TVShowDetail = () => {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

    useEffect(() => {
        const fetchTVShowDetails = async () => {
            try {
                setLoading(true);
                const showData = await getTVShowDetails(id);
                setShow(showData);
                setSeasons(showData.seasons);

                // Fetch credits
                const creditsResponse = await fetch(
                    `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                );
                const creditsData = await creditsResponse.json();
                setCast(creditsData.cast.slice(0, 10)); // Top 10 cast members
                setCrew(creditsData.crew);

                // Fetch recommendations
                const recResponse = await fetch(
                    `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                );
                const recData = await recResponse.json();
                setRecommendations(recData.results.slice(0, 6)); // Top 6 recommendations

                setError(null);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch TV show details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchTVShowDetails();
    }, [id]);

    const handleFavoriteClick = () => {
        if (!show) return;

        if (isFavorite(show.id)) {
            removeFromFavorites(show.id);
        } else {
            addToFavorites({
                ...show,
                media_type: 'tv'
            });
        }
    };

    const formatEpisodeRuntime = (runtime) => {
        if (!runtime || runtime.length === 0) return 'N/A';
        return runtime.map(min => `${min}m`).join(', ');
    };

    const getDirectors = () => {
        return crew.filter(person => person.job === 'Director');
    };

    const getProducers = () => {
        return crew.filter(person => person.job === 'Producer' || person.job === 'Executive Producer');
    };

    const getCreators = () => {
        return show.created_by || [];
    };

    if (loading) {
        return <div className="loading">Loading TV show details...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!show) {
        return <div className="error">TV show not found</div>;
    }

    const isFav = isFavorite(show.id);

    return (
        <div className="tvshow-detail-container">
            {/* Backdrop and basic info */}
            <div className="tvshow-backdrop" style={{
                backgroundImage: show.backdrop_path
                    ? `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/original/${show.backdrop_path})`
                    : 'linear-gradient(135deg, #0f0f23, #1a1a2e)'
            }}>
                <div className="tvshow-poster-container">
                    <img
                        src={show.poster_path
                            ? `https://image.tmdb.org/t/p/w500/${show.poster_path}`
                            : '/placeholder-image.jpg'
                        }
                        alt={show.name}
                        className="tvshow-poster"
                    />
                </div>

                <div className="tvshow-header-info">
                    <h1 className="tvshow-title">{show.name}</h1>
                    <div className="tvshow-meta">
                        <span>{show.first_air_date && new Date(show.first_air_date).getFullYear()}</span>
                        {show.last_air_date && show.first_air_date !== show.last_air_date && (
                            <span>- {new Date(show.last_air_date).getFullYear()}</span>
                        )}
                        {show.episode_run_time && show.episode_run_time.length > 0 && (
                            <span>{formatEpisodeRuntime(show.episode_run_time)}</span>
                        )}
                        <span>{show.vote_average.toFixed(1)}/10</span>
                        {show.status && <span>{show.status}</span>}
                    </div>

                    <div className="tvshow-genres">
                        {show.genres.map(genre => (
                            <span key={genre.id} className="genre-tag">{genre.name}</span>
                        ))}
                    </div>

                    <div className="tvshow-networks">
                        {show.networks && (
                            <>
                                {show.networks.slice(0, 10).map(network => (
                                    <div key={network.id} className="network">
                                        {network.logo_path && (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w200/${network.logo_path}`}
                                                alt={network.name}
                                                className="network-logo"
                                                loading="lazy" // Add lazy loading
                                            />
                                        )}
                                        <span>{network.name}</span>
                                    </div>
                                ))}
                                {show.networks.length > 10 && (
                                    <div className="network-more">
                                        +{show.networks.length - 10} more
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <button
                        className={`favorite-btn ${isFav ? 'active' : ''}`}
                        onClick={handleFavoriteClick}
                    >
                        {isFav ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="tvshow-content">
                {/* Overview */}
                <section className="tvshow-section">
                    <h2>Overview</h2>
                    <p className="tvshow-overview">{show.overview || 'No overview available.'}</p>
                </section>

                {/* Show Info */}
                <section className="tvshow-section">
                    <h2>Show Info</h2>
                    <div className="details-grid">
                        {getCreators().length > 0 && (
                            <div className="detail-item">
                                <h3>Created By</h3>
                                <div className="creators-list">
                                    {getCreators().map(creator => (
                                        <span key={creator.id}>{creator.name}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {show.number_of_seasons > 0 && (
                            <div className="detail-item">
                                <h3>Seasons</h3>
                                <p>{show.number_of_seasons}</p>
                            </div>
                        )}

                        {show.number_of_episodes > 0 && (
                            <div className="detail-item">
                                <h3>Episodes</h3>
                                <p>{show.number_of_episodes}</p>
                            </div>
                        )}

                        {show.type && (
                            <div className="detail-item">
                                <h3>Type</h3>
                                <p>{show.type}</p>
                            </div>
                        )}

                        {show.original_language && (
                            <div className="detail-item">
                                <h3>Original Language</h3>
                                <p>{show.original_language.toUpperCase()}</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Seasons */}
                {seasons.length > 0 && (
                    <section className="tvshow-section">
                        <h2>Seasons</h2>
                        <div className="seasons-grid">
                            {seasons.map(season => (
                                <div key={season.id} className="season-card">
                                    <img
                                        src={season.poster_path
                                            ? `https://image.tmdb.org/t/p/w200/${season.poster_path}`
                                            : '/placeholder-image.jpg'
                                        }
                                        alt={`Season ${season.season_number}`}
                                        className="season-poster"
                                    />
                                    <div className="season-info">
                                        <h3>{season.name}</h3>
                                        <p className="season-meta">
                                            {season.air_date && new Date(season.air_date).getFullYear()} •
                                            {season.episode_count} episodes
                                        </p>
                                        {season.overview && (
                                            <p className="season-overview">
                                                {season.overview.length > 150
                                                    ? `${season.overview.substring(0, 150)}...`
                                                    : season.overview}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Cast */}
                {cast.length > 0 && (
                    <section className="tvshow-section">
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
                <section className="tvshow-section">
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
                    </div>
                </section>

                {/* Recommendations */}
                {recommendations.length > 0 && (
                    <section className="tvshow-section">
                        <h2>You Might Also Like</h2>
                        <div className="recommendations-grid">
                            {recommendations.map(rec => (
                                <MediaCard
                                    key={`rec-${rec.id}`}
                                    media={rec}
                                    type="tv"
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default TVShowDetail;
