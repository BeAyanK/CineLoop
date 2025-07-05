import './css/App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import About from './pages/About'
import PopularMovies from './pages/PopularMovies'
import NowShowingMovies from './pages/NowShowingMovies'
import UpcomingMovies from './pages/UpcomingMovies'
import TopRatedMovies from './pages/TopRatedMovies'
import PopularTVShows from './pages/PopularTVShows'
import AiringTodayTVShows from './pages/AiringTodayTVShows'
import OnTVShows from './pages/OnTVShows'
import TopRatedTVShows from './pages/TopRatedTVShows'
import MovieDetail from './pages/MovieDetail'
import TVShowDetail from './pages/TVShowDetail'
import { Routes, Route } from 'react-router-dom'
import { MovieProvider } from './contexts/MovieContext'

function App() {


  return (
    <MovieProvider >
      <NavBar />
      <main className='main-content'>
        <img className='logo' src="./cineloop.png" alt="CineLoop" />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/about' element={<About />}></Route>
          <Route path='/movies/popular' element={<PopularMovies />} />
          <Route path='/movies/now-showing' element={<NowShowingMovies />} />
          <Route path='/movies/upcoming' element={<UpcomingMovies />} />
          <Route path='/movies/top-rated' element={<TopRatedMovies />} />
          <Route path='/tv/popular' element={<PopularTVShows />} />
          <Route path='/tv/airing-today' element={<AiringTodayTVShows />} />
          <Route path='/tv/on-tv' element={<OnTVShows />} />
          <Route path='/tv/top-rated' element={<TopRatedTVShows />} />
          <Route path='/search/:query' element={<Home />} />
          <Route path='/search' element={<Home />} />
          <Route path='/movie/:id' element={<MovieDetail />} />
          <Route path='/tv/:id' element={<TVShowDetail />} />
          <Route path='/favorites/:id' element={<Favorites />} />
          <Route path='*' element={<h1>Page Not Found</h1>} />
        </Routes>
      </main>
    </MovieProvider>
  )
}

export default App
