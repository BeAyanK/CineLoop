import React from 'react'
import MovieCard from '../components/MovieCard'
import { useState } from 'react'
import '../css/Home.css'

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const movies = [
        { id: 1, title: "The Avengers", releaseDate: "2012", url: "https://image.tmdb.org/t/p/original/n3G6dLQPDDdKvUKWMlCI7LRH9TQ.jpg" },
        { id: 2, title: "The Dark Knight", releaseDate: "2008", url:"https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg" },
        { id: 3, title: "Inception", releaseDate: "2010", url:"https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg" },
        { id: 4, title: "Interstellar", releaseDate: "2014", url:"https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_.jpg"},
        { id: 5, title: "The Matrix", releaseDate: "1999", url:"https://images-cdn.ubuy.co.in/63497d4c524b6263e43a00ee-the-matrix-movie-poster-us-version-24x36.jpg" },
        { id: 6, title: "Pulp Fiction", releaseDate: "1994", url:"https://images-cdn.ubuy.co.in/6627dbaf6fd5f97c0c3af955-classic-movie-pulp-fiction-posters-hd.jpg" }
    ]

    const handleSearch= (e) => {
        e.preventDefault();
        alert(`Searching for: ${searchQuery}`);
        setSearchQuery("-----"); // Clear the search input after submission
    }

    return (
        <div className='home'>
            <form onSubmit={handleSearch} className="search-form">
                <input 
                type="text" 
                className="search-input" 
                placeholder="Search for a movie..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                />
                <button type="submit" className='search-button'>Search</button>
            </form>
            <div className="movies-grid">
                {movies.map((movie) => 
                    
                    (<MovieCard key={movie.id} movie={movie} />))}
            </div>
        </div>
    )
}

export default Home
