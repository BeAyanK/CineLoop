import React from 'react';
import { Link } from 'react-router-dom';
import '../css/About.css';

const About = () => {
    return (
        <div className="about">
            <div className="about-container">
                <div className="about-header">
                    <h1 className="manrope-700">About <span className="logo-highlight">CineLoop</span></h1>
                </div><hr className='hr'/>

                {/* Add Development Notice Section */}
                <div className="about-section development-notice">
                    <div className="section-header">
                        <h2 className="manrope-600">Development Notice</h2>
                        <div className="section-icon">🚧</div>
                    </div>
                    <p className="manrope-400">
                        CineLoop is currently in active development. Please note:
                        <ul>
                            <li>This is a demo version without user accounts</li>
                            <li>Your saved favorites are stored locally in your browser</li>
                            <li>Features may change as we continue to improve the platform</li>
                        </ul>
                        Thank you for testing CineLoop during this development phase!
                    </p>
                </div>

                <div className="about-section">
                    <div className="section-header">
                        <h2 className="manrope-600">Our Mission</h2>
                        <div className="section-icon">🎬</div>
                    </div>
                    <p className="manrope-400">
                        CineLoop revolutionizes how audiences discover and engage with movies and TV shows. 
                        By combining comprehensive data with intelligent recommendations, it creates a 
                        personalized entertainment hub for every type of viewer.
                    </p>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🔍</div>
                        <h3 className="manrope-500">Advanced Search</h3>
                        <p className="manrope-400">
                            Comprehensive search functionality across multiple categories and filters
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">❤️</div>
                        <h3 className="manrope-500">Personal Library</h3>
                        <p className="manrope-400">
                            Users can save and organize favorite content for easy access
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📱</div>
                        <h3 className="manrope-500">Cross-Platform</h3>
                        <p className="manrope-400">
                            Responsive design ensures seamless experience across all devices
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🎯</div>
                        <h3 className="manrope-500">Smart Recommendations</h3>
                        <p className="manrope-400">
                            Personalized suggestions based on viewing preferences and history
                        </p>
                    </div>
                </div>

                <div className="about-section">
                    <div className="section-header">
                        <h2 className="manrope-600">Content Coverage</h2>
                        <div className="section-icon">📺</div>
                    </div>
                    <div className="coverage-grid">
                        <div className="coverage-card">
                            <h3 className="manrope-500">Movies</h3>
                            <ul className="manrope-400">
                                <li>Blockbuster hits</li>
                                <li>Independent films</li>
                                <li>Classic cinema</li>
                                <li>International films</li>
                                <li>Documentaries</li>
                            </ul>
                        </div>
                        <div className="coverage-card">
                            <h3 className="manrope-500">TV Shows</h3>
                            <ul className="manrope-400">
                                <li>Current series</li>
                                <li>Binge-worthy dramas</li>
                                <li>Classic sitcoms</li>
                                <li>Animated series</li>
                                <li>Limited series</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="about-section">
                    <div className="section-header">
                        <h2 className="manrope-600">Technology Stack</h2>
                        <div className="section-icon">💻</div>
                    </div>
                    <div className="tech-stack">
                        <div className="tech-item">
                            <div className="tech-logo react"></div>
                            <div>
                                <h4 className="manrope-500">React</h4>
                                <p className="manrope-400">Frontend framework for responsive UI</p>
                            </div>
                        </div>
                        <div className="tech-item">
                            <div className="tech-logo tmdb"></div>
                            <div>
                                <h4 className="manrope-500">TMDB API</h4>
                                <p className="manrope-400">Comprehensive entertainment database</p>
                            </div>
                        </div>
                        <div className="tech-item">
                            <div className="tech-logo css"></div>
                            <div>
                                <h4 className="manrope-500">Modern CSS</h4>
                                <p className="manrope-400">Styling and responsive design</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about-section">
                    <div className="section-header">
                        <h2 className="manrope-600">Development</h2>
                        <div className="section-icon">👨‍💻</div>
                    </div>
                    <p className="manrope-400">
                        CineLoop was created by <strong>Ayan Khan</strong>, combining expertise in web development 
                        with a passion for film and television. The platform represents a dedicated effort 
                        to build a comprehensive entertainment discovery experience.
                    </p>
                </div>

                <div className="about-section contact-section">
                    <div className="section-header">
                        <h2 className="manrope-600">Contact</h2>
                        <div className="section-icon">📧</div>
                    </div>
                    <p className="manrope-400">
                        For inquiries or feedback about the platform:
                    </p>
                    <div className="contact-methods">
                        <a href="mailto:beaayank@gmail.com" className="contact-link">
                            <span className="contact-icon">✉️</span> beaayank@gmail.com
                        </a>
                        <div className="social-links">
                            <a href="#" className="social-link">LinkedIn</a>
                            <a href="#" className="social-link">Twitter</a>
                            <a href="#" className="social-link">GitHub</a>
                        </div>
                    </div>
                </div>

                <div className="back-home">
                    <Link to="/" className="home-link manrope-500">
                        ← Return to CineLoop
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default About;
