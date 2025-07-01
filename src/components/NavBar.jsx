import React from 'react'
import { Link } from 'react-router-dom'
import '../css/NavBar.css'

const NavBar = () => {
    return (
        <div className='navbar manrope-500'>
            <div className="navbar-brand">
                <Link to="/"><img src="./loop.png" alt="Loop" height={"50px"}/></Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className='nav-link'>Home</Link>
                <Link to="/favorites" className='nav-link'>Favorites</Link>
                <Link to="/popular" className='nav-link'>Popular</Link>
                <Link to="/in-cinemas" className='nav-link'>In Cinemas</Link>
                <Link to="/top-rated" className='nav-link'>Top Rated</Link>                
                <Link to="/upcoming" className='nav-link'>Upcoming</Link>
            </div>
        </div>
    )
}

export default NavBar;
