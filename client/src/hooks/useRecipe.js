import { useQuery } from "@tanstack/react-query";
import { fetchRecipes } from "../api/api";

export const useRecipes = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
    staleTime: 1000 * 6 * 5,
    refetchOnWindowFocus: false,
  });
};
