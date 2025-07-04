import React, { useState, useEffect } from 'react'
import MediaCard from '../components/MediaCard'
import { getPopularMovies } from '../services/api'
import '../css/MediaGridPage.css'

const PopularMovies = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const results = await getPopularMovies()
                setMovies(results.slice(0, 30))
                setError(null)
            } catch (err) {
                console.error(err)
                setError("Failed to load popular movies")
            } finally {
                setLoading(false)
            }
        }
        loadMovies()
    }, [])

    if (loading) return <div className="loading">Loading...</div>
    if (error) return <div className="error">{error}</div>

    return (
        <div className="media-grid-page">
            <h1 className="page-title">Popular Movies</h1>
            <div className="movies-grid">
                {movies.map(movie => (
                    <MediaCard key={`movie-${movie.id}`} media={movie} type="movie" />
                ))}
            </div><hr className='hr' />
        </div>
    )
}

export default PopularMovies
