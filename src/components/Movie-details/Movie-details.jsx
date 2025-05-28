import { BiCheck } from "react-icons/bi"; 
import './Movie-details.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader'
import AddStorage from '../Add-Delete-Localsorage/Add-Delete-Localsorage';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTI4NWNkMDBkNzQ1MmNiNDkzNDY0NjAzNTE1NmI5YyIsIm5iZiI6MTc0NTg4MDIwNi42ODcsInN1YiI6IjY4MTAwNDhlNWE5Yjc4ZDI3MjgxNzNhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hF1Y7JR5jBANGzeoO1kGD0dhvVG_Y-w8s1vsMCEsEW0';
const BASE_URL = 'https://api.themoviedb.org/3';

export default function MovieDetails({ movie, onClose }) {
    const [cast, setCast] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const [movieDetails, setMovieDetails] = useState(null);
    const [reviews, setReviews] = useState([]); 
    const following = JSON.parse(localStorage.getItem("following")) || [];
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const [refresh, setRefresh] = useState(0);
    
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const detailsResponse = await fetch(
                    `${BASE_URL}/movie/${movie.id}?append_to_response=videos,credits`,
                    {
                        headers: {
                            'Authorization': API_KEY,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                const detailsData = await detailsResponse.json();

                const reviewsResponse = await fetch(
                    `${BASE_URL}/movie/${movie.id}/reviews`,
                    {
                        headers: {
                            'Authorization': API_KEY,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                const reviewsData = await reviewsResponse.json();


                setMovieDetails(detailsData);
                setCast(detailsData.credits.cast);
                setReviews(reviewsData.results);

                const officialTrailer = detailsData.videos.results.find(
                    video => video.type === "Trailer" && video.site === "YouTube"
                );
                setTrailer(officialTrailer);

            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [movie.id, refresh]);

    


    const handleTrailerClick = () => {

        if (trailer) {
            window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
        }else{
            toast.info(`No trailer available for this movie`);
        }
    };

    if (!movieDetails)
         return (
         <div className="movie-details-comp">
             <Loader />
         </div>   
        );

    return (
        <div className="movie-details-comp">
            <div className="movie-content">
                <button
                    className="close-button"
                    onClick={() => {
                        onClose(); 
                        // window.location.reload()

                        
                    }}
                >
                    ×
                </button>
                <div className="movie-poster-details">
                    <img 
                        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} 
                        alt={movieDetails.title} 
                    />
                    <div className="movie-actions">
                        <button 
                            className="trailer-button" 
                            onClick={handleTrailerClick}
                        >
                            <span className="play-icon">▶</span>
                            Watch Trailer
                        </button>
                        <button 
                            className={`favorites-button  ${favorites.find(item => item.id === movie.id) ? 'active' : ''}`}
                            onClick={() => {
                                AddStorage('favorites', movie); 
                                setRefresh(refresh + 1); 

                                const isFavorites = favorites.find(item => item.id === movie.id);
                                if (isFavorites === undefined) {
                                    toast.success(`Added ${movie.name} to favorites list`);
                                } else if (isFavorites !== undefined) {
                                    toast.error(`Removed ${movie.name} from favorites list`); 
                                }
                            }}
                            
                        >
                            ❤
                        </button>
                    </div>
                </div>

                <div className="movie-info-container">
                    <div className="movie-header">
                        <h1 className="movie-tittle">{movieDetails.title}</h1>
                        <div className="movie-meta-details">
                            <span>{movieDetails.release_date}</span>
                            <span>⭐ {movieDetails.vote_average.toFixed(1)}</span>
                            <span>{movieDetails.runtime ? `${movieDetails.runtime} min` : 'Duration not available'}</span>
                            <span>{movieDetails.genres.map(g => g.name).join(' , ')}</span>
                        </div>
                    </div>

                    <p className="movie-overview">{movieDetails.overview}</p>

                    <div className="cast-section">
                        <h2 className="section-title">Cast</h2>
                        <Swiper
                            modules={[Navigation]}
                            navigation
                            spaceBetween={20}
                            slidesPerView="auto"
                            className="cast-list"
                        >
                            {cast.map((actor) => (
                                <SwiperSlide key={actor.id}>
                                        <div className="cast-item">
                                                <Link to="/movies-page"  state={{ actorName: actor.name }}
                                                    onClick={() => {
                                                        onClose();
                                                }}>
                                                    <img 
                                                        src={actor.profile_path 
                                                            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                                            : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}
                                                        alt={actor.name}
                                                        className="cast-image"
                                                    />
                                                </Link>
                                            <div className="cast-info">
                                                <span className="cast-name">{actor.name}</span>
                                                <span className="cast-role">{actor.character}</span>
                                            </div>
                                            <div className="cast-actions">
                                                <button 
                                                    className={`cast-action-btn ${following.find(item => item.id === actor.id) ? 'active' : ''}`}
                                                    onClick={() => {
                                                        AddStorage('following', actor); 
                                                        setRefresh(refresh + 1); 

                                                        const isFollowed = following.find(item => item.id === actor.id);
                                                        if (isFollowed === undefined) {
                                                            toast.success(`Added ${actor.name} to following list`);
                                                        } else if (isFollowed !== undefined) {
                                                            toast.error(`Removed ${actor.name} from following list`); 
                                                        }
                                                    }}
                                                >
                                                    {following.find(item => item.id === actor.id) ? <BiCheck /> : '+'}
                                                </button>
                                            </div>
                                        </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="comments-section">
                        <h2 className="section-title">Comments</h2>
                        <div className="comments-list">
                            {reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <div key={review.id} className="comment-item">
                                        <div className="comment-header">
                                            <img 
                                                src={`https://ui-avatars.com/api/?name=${review.author}&background=random`}
                                                alt={review.author}
                                                className="user-avatar"
                                            />
                                            <div className="comment-meta">
                                                <span className="user-name">{review.author}</span>
                                                <span className="comment-date">
                                                    {new Date(review.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="comment-text">{review.content}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="no-reviews">No Comments yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



