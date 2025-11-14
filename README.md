# 🎬 CineLoop

**Your Gateway to Cinematic Discovery**

CineLoop is a modern, responsive web application for discovering and exploring movies and TV shows. Built with React and powered by The Movie Database (TMDB) API, it provides a comprehensive entertainment discovery experience with personalized favorites and intelligent recommendations.

![](https://github.com/BeAyanK/CineLoop/blob/main/public/cineloop.png)

## ✨ Features

### 🔍 **Comprehensive Search**
- Multi-search functionality across movies and TV shows
- Real-time search results with filtering
- Categorized search results (favorites vs. other results)

### 📺 **Content Categories**

**Movies:**
- Popular Movies
- Now Showing
- Upcoming Releases
- Top Rated Movies

**TV Shows:**
- Popular TV Shows
- Airing Today
- Currently On TV
- Top Rated TV Shows

### ❤️ **Personal Library**
- Save favorite movies and TV shows
- Persistent local storage
- Search within your favorites
- Separate categorization of movies and TV shows

### 📱 **Responsive Design**
- Seamless experience across all devices
- Mobile-optimized navigation with hamburger menu
- Adaptive grid layouts
- Touch-friendly interface

### 🎯 **Detailed Information**
- Comprehensive movie/TV show details
- Cast and crew information
- Season and episode breakdowns (TV shows)
- Production details and budget information
- Personalized recommendations

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDB API Key ([Get it here](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BeAyanK/cineloop.git
   cd cineloop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_TMDB_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 🛠️ Technology Stack

### Frontend Framework
- **React 19.1.0** - Modern UI library with hooks
- **React Router DOM 7.6.3** - Client-side routing
- **Vite 7.0.0** - Fast build tool and dev server

### Styling
- **Custom CSS** - Modular, responsive styling
- **Google Fonts (Manrope)** - Clean, modern typography
- **Gradient Backgrounds** - Engaging visual design

### API Integration
- **TMDB API** - Comprehensive movie and TV show database
- **Fetch API** - Modern data fetching

### State Management
- **React Context API** - Global state for favorites
- **Local Storage** - Persistent user preferences

## 📂 Project Structure

```
cineloop/
├── public/
│   ├── cineloop.png
│   └── loop.png
├── src/
│   ├── components/
│   │   ├── MediaCard.jsx
│   │   └── NavBar.jsx
│   ├── contexts/
│   │   └── MovieContext.jsx
│   ├── css/
│   │   ├── About.css
│   │   ├── App.css
│   │   ├── Favorites.css
│   │   ├── Home.css
│   │   ├── MediaCard.css
│   │   ├── MediaGridPage.css
│   │   ├── MovieDetail.css
│   │   ├── NavBar.css
│   │   ├── TVShowDetail.css
│   │   └── index.css
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── AiringTodayTVShows.jsx
│   │   ├── Favorites.jsx
│   │   ├── Home.jsx
│   │   ├── MovieDetail.jsx
│   │   ├── NowShowingMovies.jsx
│   │   ├── OnTVShows.jsx
│   │   ├── PopularMovies.jsx
│   │   ├── PopularTVShows.jsx
│   │   ├── TopRatedMovies.jsx
│   │   ├── TopRatedTVShows.jsx
│   │   ├── TVShowDetail.jsx
│   │   └── UpcomingMovies.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   └── main.jsx
├── .env
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Key Components

### MediaCard
Reusable card component for displaying movies and TV shows with:
- Poster images
- Rating and release date
- Favorite button
- Click-to-navigate functionality

### NavBar
Responsive navigation with:
- Desktop dropdown menus
- Mobile sidebar navigation
- Animated logo
- Smooth transitions

### MovieContext
Global state management for:
- Favorites list
- Add/remove operations
- Favorite status checking
- Local storage persistence

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🌐 API Endpoints Used

- `/trending/movie/week` - Trending movies
- `/trending/tv/week` - Trending TV shows
- `/movie/popular` - Popular movies
- `/movie/now_playing` - Currently showing movies
- `/movie/upcoming` - Upcoming movie releases
- `/movie/top_rated` - Top rated movies
- `/tv/popular` - Popular TV shows
- `/tv/airing_today` - TV shows airing today
- `/tv/on_the_air` - Currently airing TV shows
- `/tv/top_rated` - Top rated TV shows
- `/search/multi` - Multi-search (movies & TV shows)
- `/movie/{id}` - Movie details
- `/tv/{id}` - TV show details
- `/movie/{id}/credits` - Movie cast and crew
- `/tv/{id}/credits` - TV show cast and crew
- `/movie/{id}/recommendations` - Movie recommendations
- `/tv/{id}/recommendations` - TV show recommendations

## 🎯 Features in Detail

### Favorites System
- **Persistent Storage**: Uses localStorage to save favorites across sessions
- **Smart Filtering**: Separates movies and TV shows in favorites view
- **Search Integration**: Search within favorites with categorized results
- **Visual Indicators**: Heart icon shows favorite status

### Responsive Design
- **Breakpoints**:
  - Desktop: 1200px+
  - Tablet: 768px - 1199px
  - Mobile: < 768px
- **Grid Layouts**: Adaptive columns based on screen size
- **Touch Optimization**: Mobile-friendly interactions

### Detail Pages
- **Rich Information**: Comprehensive movie/TV show data
- **Cast & Crew**: Visual presentation with images
- **Recommendations**: Contextual suggestions
- **Production Details**: Budget, revenue, companies, countries

## 🚧 Development Status

CineLoop is currently in active development. This is a demo version without user accounts. Features may change as development continues.

### Current Limitations
- No user authentication
- Favorites stored locally (browser-specific)
- No cross-device synchronization

### Planned Features
- User accounts and authentication
- Cloud-based favorites sync
- Watchlist functionality
- Review and rating system
- Advanced filtering options

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

**Ayan Khan**
- Email: beaayank@gmail.com
- LinkedIn: [Ayan Khan](https://www.linkedin.com/in/ayan-khan-work/)
- Twitter: [@ChhodoYrr](https://twitter.com/ChhodoYrr)
- GitHub: [@BeAyanK](https://github.com/BeAyanK)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **TMDB** - For providing the comprehensive movie and TV show database
- **React Team** - For the amazing React library
- **Vite Team** - For the lightning-fast build tool
- **Google Fonts** - For the beautiful Manrope font family


**Made by Ayan Khan (BeAyanK)**

*CineLoop - Where Cinema Meets Discovery*
