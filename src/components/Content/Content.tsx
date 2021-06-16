import { useContext, useEffect, useState } from "react";
import { GenreContext } from "../../Hooks/useGenres";
import { api } from "../../services/api";
import { MovieCard } from "../MovieCard/MovieCard";
import "./content.scss";

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function Content() {
  // Complete aqui
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const { genreSelected } = useContext(GenreContext);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${genreSelected.id}`)
      .then((response) => {
        setMovies(response.data);
      });
  }, [genreSelected]);

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {genreSelected.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
