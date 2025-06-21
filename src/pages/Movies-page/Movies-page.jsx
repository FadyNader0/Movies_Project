import { useState, useEffect} from 'react';
import './Movies-page.css';
import { useGenre } from '../../components/Rivew-genre/Rivew-genre';
import { Link, useLocation } from 'react-router-dom';
import ShowMovies from '../../components/Show-Movies/Show-Movies';
import Loader from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import addStorage from '../../components/Add-Delete-Localsorage/Add-Delete-Localsorage';

export default function MoviesPage () {
  const genres = useGenre();
  const [movies, setMovies] = useState([]);
  const [page, setpage] = useState(1);
  const [sort, setSort] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [actor, setActor] = useState(null);
  const [actorDetails, setactorDetails] = useState(null);
  const [refresh , setRefresh] = useState(0);
  const location = useLocation();
  const { GgenreId } = location.state || {};
  const { actorName } = location.state || {};
  const queryParams = new URLSearchParams(location.search);
  const following = JSON.parse(localStorage.getItem("following")) || [];
  let query = queryParams.get("query");

  useEffect(() => {
    if (GgenreId !== undefined) {
      setGenre(GgenreId);  
    }
  }, [GgenreId]); 
  useEffect(() => {
    if (actorName !== undefined) {
      setActor(actorName);  
    }
  }, [actorName]); 

const sortByNewestDate = (moviesArray) => {
  return [...moviesArray].sort((a, b) => {
    const dateA = new Date(a.release_date || '1900-01-01');
    const dateB = new Date(b.release_date || '1900-01-01');
    return dateB - dateA; 
  });
};

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTI4NWNkMDBkNzQ1MmNiNDkzNDY0NjAzNTE1NmI5YyIsIm5iZiI6MTc0NTg4MDIwNi42ODcsInN1YiI6IjY4MTAwNDhlNWE5Yjc4ZDI3MjgxNzNhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hF1Y7JR5jBANGzeoO1kGD0dhvVG_Y-w8s1vsMCEsEW0', 
    }
  };
  
useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  async function fetchMovies() {
    try {
      let moviesData = [];

      if (query && query !== "") {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?page=${page}&query=${query}`, options);
        const data = await res.json();
        setActor("");
        moviesData = data.results;

      } else if (actor && actor !== "") {
        const resPerson = await fetch(`https://api.themoviedb.org/3/search/person?query=${actor}&page=1`, options);
        const dataPerson = await resPerson.json();

        if (dataPerson.results.length > 0) {
          setactorDetails(dataPerson.results[0]);
          const actorId = dataPerson.results[0].id;


          const resCredits = await fetch(`https://api.themoviedb.org/3/person/${actorId}/movie_credits`, options);
          const dataCredits = await resCredits.json();

          moviesData = dataCredits.cast; 
          moviesData = sortByNewestDate(moviesData);
        }
      } else {

        const apiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=${sort}&with_genres=${genre}&year=${year}&page=${page}`;
        const res = await fetch(apiUrl, options);
        const data = await res.json();
        moviesData = data.results;
        moviesData = sortByNewestDate(moviesData);
      }
      if (year && (!actor || actor === "") && (!query || query === "")) {
        moviesData = moviesData.filter(movie => {
          const movieYear = movie.release_date?.split("-")[0];
          return movieYear === year;
        });
      }

      setMovies(moviesData);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to fetch movies");
    }
  }

  fetchMovies();
}, [page, sort, genre, year, query, actor , refresh]);
  return (
    <div className="movies-page">
      <h1 className='movies-page-tittle'>Discover Movies</h1>
      <div className="movies-header">
        <div className={`filter-options ${actor && actor !=="" ? "hidden" : ""}`}>
          <div className="filter-group" >
            <label>Genre</label>
            <select 
              name="genre" 
              onChange={(e) => {setGenre(e.target.value); setpage(1)}}
              className="filter-select sel"
              value={genre}
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Year</label>
            <input
              type="number"
              min="1900"  
              name="year" 
              className="filter-select"
              onChange={(e) => {setYear(e.target.value) ; setpage(1)}}
              value={year}
            >
            </input>
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select 
              name="sort" 
              className="filter-select sel"
              onChange={(e) =>{ setSort(e.target.value) ; setpage(1)}}
              value={sort}
            >
              <option value="">Default</option>
              <option value="popularity.desc">Sort by Popularity (Desc)</option>
              <option value="popularity.asc">Sort by Popularity (Asc)</option>
              <option value="release_date.desc">Sort by Release Date (Desc)</option>
              <option value="release_date.asc">Sort by Release Date (Asc)</option>
              <option value="vote_average.desc">Sort by Vote Average (Desc)</option>
              <option value="vote_average.asc">Sort by Vote Average (Asc)</option>
              <option value="vote_count.desc">Sort by Vote Count (Desc)</option>
              <option value="vote_count.asc">Sort by Vote Count (Asc)</option>
            </select>
          </div>

        </div>
        <div className={`pagination-buttons ${actor && actor !=="" ? "hidden" : ""}`}>
          <button  className="page-btn" disabled={page === 1} onClick={() =>{setpage(page - 1);setRefresh(refresh + 1);setMovies([])}}>
              Prev</button>
          <p className="page-number">Page 
          <input 
                className="input-page" 
                type="number" 
                placeholder={page}
             
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value > 0 && e.target.value <= 500) {
                    setpage(Number(e.target.value));
                    e.target.value = '';
                  }
                }} />
             </p>
          <button  className="page-btn" disabled={page === 500} onClick={() =>{setpage(page + 1);setRefresh(refresh + 1);setMovies([])}}>Next</button>
        </div>
        <div className={`actor-details ${actor && actor !=="" ? "view" : ""}`}>
            <div className="actor-profile">
                {actorDetails?.profile_path && (
                    <img 
                        src={`https://image.tmdb.org/t/p/w500${actorDetails.profile_path}`}
                        alt={actorDetails?.name}
                        className="actor-image"
                    />
                )}
                <div className="actor-info">
                    <h2 className="actor-name">{actorDetails?.name}</h2>
                    {actorDetails?.known_for_department && (
                        <p className="actor-department">Known for: {actorDetails.known_for_department}</p>
                    )}
                    
                    {actorDetails?.popularity && (
                        <div className="popularity-meter">
                            <span className="popularity-label">Popularity</span>
                            <div className="popularity-bar">
                                <div 
                                    className="popularity-fill"
                                    style={{ width: `${actorDetails.popularity}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>
                <Link to="/movies-page" className='clear-btn-act' 
                    onClick={() => {
                      setGenre("");
                      setYear("");
                      setSort("");
                      setpage(1);
                      setActor("");
                      query = "";

                    }}
>
                    X</Link>

            </div>
        </div>
       <Link to="/movies-page"
            className={`clear-filters-btn clear-noactor ${actor && actor !=="" ? "disactive" : ""}`}
            onClick={() => {
              setGenre("");
              setYear("");
              setSort("");
              setpage(1);
              setActor("");
              query = "";

            }}
          >
            Clear Filters
        </Link>
        <button className={`clear-filters-btn unfloow-btn-actor ${actor && actor !=="" ? "view" : ""}`} 
                onClick={() => 
                  {addStorage('following', actorDetails); 
                  setRefresh(refresh + 1);  
                  {following.find(item => item.id === actorDetails?.id) ? 
                    toast.error(`Removed ${actorDetails?.name} from following list`) : 
                    toast.success(`Added ${actorDetails?.name} to following list`)}
                }}>
                    {following.find(item => item.id === actorDetails?.id) ? "Unfollow" : 'Follow'}
        </button>

        
      </div>
            
      {query !== null && <h2 className="text-3xl mb-4">Search Results for: <strong>{query}</strong></h2>}
      {movies.length === 0 && query !== null  ? (
              <h1 className="no-results movies-page-tittle">No results found</h1>
      ) : null}
      {movies.length === 0 && query === null  ? (
              <Loader />
      ) : null}
      
      <div className="movies-grid">
        {movies.length !== 0 && movies.map((movie) => (
          <ShowMovies key={movie.id} movie={movie}  />

        ))}
      </div>
    </div>
  );
};

