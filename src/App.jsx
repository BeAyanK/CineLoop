import './css/App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import About from './pages/About'
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
          <Route path='*' element={<h1>Page Not Found</h1>} />
        </Routes>
      </main>
    </MovieProvider>
  )
}

export default App
