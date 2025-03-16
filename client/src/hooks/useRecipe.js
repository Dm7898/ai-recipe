import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRecipe, fetchRecipes } from "../api/api";
import { toast } from "sonner";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useRecipes = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
    staleTime: 1000 * 6 * 5,
    refetchOnWindowFocus: false,
  });
};

export const useDeleteRecipe = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteRecipe(id, user.token),
    onSuccess: () => {
      toast.success("Recipe deleted successfully!");
      queryClient.invalidateQueries("recipes");
    },
    onError: (error) => {
      toast.error("Server error");
      console.error(error);
    },
  });
};
