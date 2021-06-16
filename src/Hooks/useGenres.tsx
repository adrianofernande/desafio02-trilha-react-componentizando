import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import { api } from "../services/api";

interface Genre {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface GenresProviderProps {
  children: ReactNode;
}

interface GenresContextData {
  genres: Genre[];
  genreSelected: Genre;
  handleGenreSelected: (id: number) => void;
}

export const GenreContext = createContext<GenresContextData>(
  {} as GenresContextData
);

export function GenreProvider({ children }: GenresProviderProps) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genre, setGenre] = useState(0);
  const [genreSelected, setGenreSelected] = useState<Genre>({
    id: 1,
    name: "action",
    title: "",
  });

  useEffect(() => {
    api.get<Genre[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  const handleGenreSelected = (id: number) => {
    setGenre(id);
    const filtered = genres.filter((item) => item.id === id);
    setGenreSelected(filtered[0]);
  };

  return (
    <GenreContext.Provider
      value={{ genres, genreSelected, handleGenreSelected }}
    >
      {children}
    </GenreContext.Provider>
  );
}

export function useGenres() {
  const context = useContext(GenreContext);
  return context;
}
