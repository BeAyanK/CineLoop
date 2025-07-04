import React, { useState, useEffect } from 'react'
import MediaCard from '../components/MediaCard'
import { getOnTheAirTVShows } from '../services/api'
import '../css/MediaGridPage.css'

const OnTVShows = () => {
    const [shows, setShows] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadShows = async () => {
            try {
                const results = await getOnTheAirTVShows()
                setShows(results.slice(0, 30))
                setError(null)
            } catch (err) {
                console.error(err)
                setError("Failed to load on TV shows")
            } finally {
                setLoading(false)
            }
        }
        loadShows()
    }, [])

    if (loading) return <div className="loading">Loading...</div>
    if (error) return <div className="error">{error}</div>

    return (
        <div className="media-grid-page">
            <h1 className="page-title">Currently Airing TV Shows</h1>
            <div className="movies-grid">
                {shows.map(show => (
                    <MediaCard key={`tv-${show.id}`} media={show} type="tv" />
                ))}
            </div><hr className='hr' />
        </div>
    )
}

export default OnTVShows
