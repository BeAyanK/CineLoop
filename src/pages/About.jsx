import React from 'react';
import { Link } from 'react-router-dom';
import '../css/About.css';

const About = () => {
    return (
        <div className="about">
            <div className="about-container">
                <h1 className="manrope-700">About CineLoop</h1>

                <div className="about-section">
                    <h2 className="manrope-600">Our Mission</h2>
                    <p className="manrope-400">
                        CineLoop is your ultimate destination for comprehensive and up-to-date
                        information about movies and TV shows. Whether you're looking for new releases,
                        classics, or hidden gems across both film and television, we provide detailed
                        information, ratings, and personalized recommendations to enhance your viewing experience.
                    </p>
                </div>

                <div className="about-section">
                    <h2 className="manrope-600">Features</h2>
                    <ul className="features-list manrope-400">
                        <li>Browse popular, top-rated, and upcoming movies and TV shows </li>
                        <li>Search our extensive database of films and television series</li>
                        <li>Save your favorite movies and TV shows to watch later</li>
                        <li>Get detailed information about each title including cast, ratings and more</li>
                        <li>Discover trending content across both platforms</li>
                        <li>Responsive design works on all devices</li>
                    </ul>
                </div>

                <div className="about-section">
                    <h2 className="manrope-600">Content Coverage</h2>
                    <div className="coverage-grid manrope-400">
                        <div className="coverage-item">
                            <h3 className="manrope-500">Movies</h3>
                            <ul>
                                <li>Popular Movies</li>
                                <li>New Releases</li>
                                <li>Upcoming Movies</li>
                                <li>Top-Rated Cinema</li>
                                <li>International Films</li>
                            </ul>
                        </div>
                        <div className="coverage-item">
                            <h3 className="manrope-500">TV Shows</h3>
                            <ul>
                                <li>Current Series</li>
                                <li>Popular Shows</li>
                                <li>Airing Today Series</li>
                                <li>Top Rated</li>
                                <li>TV Classics</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="about-section">
                    <h2 className="manrope-600">Technology Stack</h2>
                    <div className="tech-stack manrope-400">
                        <div className="tech-item">
                            <span className="tech-name">React</span>
                            <span className="tech-desc">Frontend framework</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-name">TMDB API</span>
                            <span className="tech-desc">Movie & TV show data</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-name">CSS3</span>
                            <span className="tech-desc">Styling</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-name">React Router</span>
                            <span className="tech-desc">Navigation</span>
                        </div>
                    </div>
                </div>

                <div className="about-section">
                    <h2 className="manrope-600">Contact</h2>
                    <p className="manrope-400">
                        Have questions or suggestions about our movie and TV show coverage?
                        We'd love to hear from you!
                        <br />
                        Email us at: <a href="mailto:contact@cineloop.com" className="contact-link">contact@cineloop.com</a>
                    </p>
                </div>

                <div className="back-home manrope-500">
                    <Link to="/" className="home-link">← Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default About;
