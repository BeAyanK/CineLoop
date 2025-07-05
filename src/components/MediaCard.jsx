import React from 'react'
import PropTypes from 'prop-types'
import '../css/MediaCard.css'
import { useMovieContext } from '../contexts/MovieContext'
import { useNavigate } from 'react-router-dom' // Add this import

const MediaCard = ({ media = {}, type = 'movie' }) => {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext()
    const navigate = useNavigate() // Initialize the navigate function
    
    // Safe property access with defaults
    const favorite = isFavorite(media?.id || 0)
    const title = media?.title || media?.name || 'Untitled'
    const releaseDate = media?.release_date || media?.first_air_date || 'Date unknown'
    const formattedRating = media?.vote_average ? media.vote_average.toFixed(1) : 'N/A'
    const posterPath = media?.poster_path 
        ? `https://image.tmdb.org/t/p/w500/${media.poster_path}`
        : '/placeholder-image.jpg'

    function onFavoriteClick(e) {
        e.stopPropagation() // Prevent triggering the card click when clicking favorite
        if (!media?.id) return
        
        if (favorite) {
            removeFromFavorites(media.id)
        } else {
            addToFavorites({ 
                ...media, 
                media_type: type || (media.media_type ? media.media_type : 'movie') 
            })
        }
    }

    // Function to handle card click
    const handleCardClick = () => {
        if (!media?.id) return;
        
        // Navigate to the appropriate detail page based on media type
        navigate(`/${type}/${media.id}`);
    }

    if (!media) {
        return <div className="movie-card error">No media data available</div>
    }

    return (
        <div className='movie-card' onClick={handleCardClick}>
            <div className='movie-poster'>
                <img src={posterPath} alt={title} />
                <div className="movie-overlay">
                    <button className={`favorite-btn ${favorite ? 'active' : ''}`} onClick={onFavoriteClick}>
                        ♥
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3 className='manrope-700'>{title}</h3>
                <p className='manrope-500'>
                    Rating: {formattedRating}/10 <br /> 
                    {type === 'tv' ? 'First Air Date' : 'Release Date'}: {releaseDate}
                </p>
            </div>
        </div>
    )
}


MediaCard.propTypes = {
    media: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        name: PropTypes.string,
        poster_path: PropTypes.string,
        vote_average: PropTypes.number,
        release_date: PropTypes.string,
        first_air_date: PropTypes.string,
        media_type: PropTypes.string
    }),
    type: PropTypes.oneOf(['movie', 'tv'])
}

MediaCard.defaultProps = {
    media: {
        id: 0,
        title: '',
        name: '',
        poster_path: '',
        vote_average: 0,
        release_date: '',
        first_air_date: '',
        media_type: 'movie'
    },
    type: 'movie'
}

export default MediaCard
