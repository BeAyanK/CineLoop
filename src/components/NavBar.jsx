import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='navbar manrope-500'>
            <div className="navbar-brand">
                <Link to="/"><img src="./loop.png" alt="Loop" height={"50px"} /></Link>
            </div>

            {/* Hamburger Icon */}
            <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            {/* Mobile Sidebar */}
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-links">
                    <Link to="/" className='nav-link' onClick={toggleMenu}>Home</Link>
                    <div className="mobile-dropdown">
                        <div className="mobile-dropdown-header">Movies</div>
                        <div className="mobile-dropdown-content">
                            <Link to="/movies/popular" className='nav-link' onClick={toggleMenu}>Popular</Link>
                            <Link to="/movies/now-showing" className='nav-link' onClick={toggleMenu}>Now Showing</Link>
                            <Link to="/movies/upcoming" className='nav-link' onClick={toggleMenu}>Upcoming</Link>
                            <Link to="/movies/top-rated" className='nav-link' onClick={toggleMenu}>Top Rated</Link>
                        </div>
                    </div>
                    <div className="mobile-dropdown">
                        <div className="mobile-dropdown-header">TV Shows</div>
                        <div className="mobile-dropdown-content">
                            <Link to="/tv/popular" className='nav-link' onClick={toggleMenu}>Popular</Link>
                            <Link to="/tv/now-showing" className='nav-link' onClick={toggleMenu}>Now Showing</Link>
                            <Link to="/tv/upcoming" className='nav-link' onClick={toggleMenu}>Upcoming</Link>
                            <Link to="/tv/top-rated" className='nav-link' onClick={toggleMenu}>Top Rated</Link>
                        </div>
                    </div>
                    <Link to="/favorites" className='nav-link' onClick={toggleMenu}>Favorites</Link>
                    <Link to="/about" className='nav-link' onClick={toggleMenu}>About</Link>
                </div>
            </div>

            {/* Desktop Links */}
            <nav className="navbar-links">
                <Link to="/" className='item'>Home</Link>

                <div className="item">
                    Movies
                    <div className="dropdown">
                        <div>
                            <Link to="/movies/popular">Popular</Link>
                            <Link to="/movies/now-showing">Now Showing</Link>
                            <Link to="/movies/upcoming">Upcoming</Link>
                            <Link to="/movies/top-rated">Top Rated</Link>
                        </div>
                    </div>
                </div>

                <div className="item">
                    TV Shows
                    <div className="dropdown">
                        <div>
                            <Link to="/tv/popular">Popular</Link>
                            <Link to="/tv/airing-today">Airing Today</Link>
                            <Link to="/tv/on-tv">On TV</Link>
                            <Link to="/tv/top-rated">Top Rated</Link>
                        </div>
                    </div>
                </div>

                <Link to="/favorites" className='item'>Favorites</Link>
                <Link to="/about" className='item'>About</Link>

                <div className="underline"></div>
            </nav>
        </div>
    );
};

export default NavBar;
