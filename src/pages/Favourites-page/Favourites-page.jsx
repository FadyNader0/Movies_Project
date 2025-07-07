import { useState, useEffect } from 'react';
import ShowMovies from '../../components/Show-Movies/Show-Movies';
import './Favourites-page.css';
import { Link } from 'react-router-dom';

export default function FavouritesPage() {
    const [favourites, setFavourites] = useState([]);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const storedFavorites = localStorage.getItem('favorites') || '[]';
        setFavourites(JSON.parse(storedFavorites));
    }, [refresh]);

    const clearAllFavorites = () => {
        localStorage.setItem('favorites', '[]');
        setRefresh(prev => prev + 1);
    };

    return (
        <div className="favourites-page">
            <div className="favourites-header">
                <h1>My Favorites</h1>
                {favourites.length > 0 && (
                    <button 
                        className="clear-all-btn"
                        onClick={clearAllFavorites}
                    >
                        Clear All
                    </button>
                )}
            </div>
            
            {favourites.length === 0 ? (
                <div className="no-favourites">
                    <div className="empty-state">
                        <i className="fas fa-heart-broken"></i>
                        <h2>No Favorites Yet</h2>
                        <p>Start adding movies to your favorites list!</p>
                        <Link className='start-browsing' to="/movies-page">Start</Link>
                    </div>
                </div>
            ) : (
                <div className="favourites-stats">
                    <div className="stats-card">
                        <span className="stats-number">{favourites.length}</span>
                        <span className="stats-label">Favorite Movies</span>
                    </div>
                </div>
            )}

            <div className="favourites-grid">
                {favourites.map((movie) => (
                    <ShowMovies key={movie.id} movie={movie}  />
                ))}
            </div>
        </div>
    );
}