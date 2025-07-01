import React from 'react'
import '../css/MovieCard.css'
import { useMovieContext } from '../contexts/MovieContext'

const MovieCard = ({movie}) => {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)
    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) {
            removeFromFavorites(movie.id)
        } else {
            addToFavorites(movie)
            console.log( movie)
        }
    }

    return (
        <div className='movie-card' max-height="200px" max-width="150px">
            <div className='movie-poster'>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                <div className="movie-overlay">
                    <button className={`favorite-btn ${favorite ? 'active' : ''}`} onClick={onFavoriteClick}>
                        ♥
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3 className='manrope-700'>{movie.title}</h3> <p></p>
                <p className='manrope-500'>{movie.vote_average}/10 <br /> Release Date: {movie.release_date}</p>
            </div>
        </div>
    )
}

export default MovieCard
