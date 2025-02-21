import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../api/fetchers";

interface UseMoviesParams {
  skip?: number;
  limit?: number;
  query?: string;
  isEnabled: boolean;
}

const useMovies = ({ skip, limit, query, isEnabled }: UseMoviesParams) =>
  useQuery({
    queryKey: [
      "movies",
      ...(skip ? ["skip", skip] : []),
      ...(limit ? ["limit", limit] : []),
      ...(query ? ["query", query] : []),
    ],
    queryFn: () => fetchMovies({ skip, limit, query }),
    enabled: isEnabled,
    staleTime: 1000 * 60 * 5,
    retry: 0,
  });


  
export { useMovies };
