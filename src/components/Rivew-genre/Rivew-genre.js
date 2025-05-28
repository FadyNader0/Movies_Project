import { useEffect, useState } from "react";

export function useGenre() {
      const [Genres, setGenres] = useState([]);
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTI4NWNkMDBkNzQ1MmNiNDkzNDY0NjAzNTE1NmI5YyIsIm5iZiI6MTc0NTg4MDIwNi42ODcsInN1YiI6IjY4MTAwNDhlNWE5Yjc4ZDI3MjgxNzNhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hF1Y7JR5jBANGzeoO1kGD0dhvVG_Y-w8s1vsMCEsEW0', 
        }
      };
    
      useEffect(() => {
        fetch('https://api.themoviedb.org/3/genre/movie/list', options)
          .then(res => res.json())
          .then(data => {
            setGenres(data.genres);
          })
          .catch(err => {
            console.error(err);
          });
      }, []);
      return Genres
    
}