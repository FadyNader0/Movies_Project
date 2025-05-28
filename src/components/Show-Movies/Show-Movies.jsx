import GetGenre from '../Get-genre-name/Get-genre-name';
import MovieDetails from '../Movie-details/Movie-details';
import './Show-Movies.css'
import { useState } from "react";

export default function ShowMovies({movie }) {
      const [selectedMovie, setSelectedMovie] = useState(null);
    return(
        <>
            <div key={movie.id} className="movie-card">
              <div className="movie-poster">
                <img  src={movie.poster_path 
                      ? `https://image.tmdb.org/t/p/w185/${movie.poster_path}`
                      : 'data:image/png;base64,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'}

                alt='{movie.original_title}' />
                <div className="movie-overlay">
                  <div className="movie-details">
                    <span className="movie-genre">

                        <GetGenre IDs={movie.genre_ids} />
                    </span>
                    <h3>{movie.original_title}</h3>
                    <div className="movie-meta">
                      <span className="movie-year">{movie.release_date}</span>
                      <div className="movie-rating">
                        <span className="star">★</span>
                        <span>{movie.vote_average}</span>
                      </div>
                    </div>
                      <button className="watch-now" onClick={() => setSelectedMovie(movie)}>
                              View Details
                      </button>

                                    
                </div>
                </div>
              </div>
            </div>
            {selectedMovie && (
                <MovieDetails
                movie={selectedMovie}
                onClose={() => setSelectedMovie(null)}
                        />
)}

        </>
    )
}