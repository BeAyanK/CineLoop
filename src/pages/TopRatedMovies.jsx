import React, { useState, useEffect } from 'react'
import MediaCard from '../components/MediaCard'
import { getTopRatedMovies } from '../services/api'
import '../css/MediaGridPage.css'

const TopRatedMovies = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const results = await getTopRatedMovies()
                setMovies(results.slice(0, 30))
                setError(null)
            } catch (err) {
                console.error(err)
                setError("Failed to load top rated movies")
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
            <h1 className="page-title">Top Rated Movies</h1>
            <div className="movies-grid">
                {movies.map(movie => (
                    <MediaCard key={`movie-${movie.id}`} media={movie} type="movie" />
                ))}
            </div><hr className='hr' />
        </div>
    )
}

export default TopRatedMovies
