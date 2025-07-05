const API_KEY = import.meta.env.VITE_TMDB_API_KEY; 
const BASE_URL = "https://api.themoviedb.org/3";

// Movie endpoints
export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
};

export const getNowPlayingMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
};

export const getUpcomingMovies = async () => {
    const today = new Date().toISOString().split('T')[0];
    const response = await fetch(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&primary_release_date.gte=${today}`
    );
    const data = await response.json();
    return data.results;
};

export const getTopRatedMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
};

export const getMovieDetails = async (id) => {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
};

// TV Show endpoints
export const getPopularTVShows = async () => {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
};

export const getAiringTodayTVShows = async () => {
    const response = await fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
};

export const getOnTheAirTVShows = async () => {
    const response = await fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
};

export const getTopRatedTVShows = async () => {
    const response = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
};

export const getTVShowDetails = async (id) => {
    const response = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
};

// Trending endpoints (NEW)
export const getTrendingMovies = async (timeWindow = 'week') => {
    // timeWindow can be 'day' or 'week'
    const response = await fetch(`${BASE_URL}/trending/movie/${timeWindow}?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
};

export const getTrendingTVShows = async (timeWindow = 'week') => {
    // timeWindow can be 'day' or 'week'
    const response = await fetch(`${BASE_URL}/trending/tv/${timeWindow}?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
};

// Search endpoints
export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
};

export const searchTVShows = async (query) => {
    const response = await fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
};

export const multiSearch = async (query) => {
    const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
};

// Common functions
export const getMediaDetails = async (category, id) => {
    if (category === 'movie') {
        return await getMovieDetails(id);
    } else if (category === 'tv') {
        return await getTVShowDetails(id);
    }
    return null;
};
