import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "../api/api";

export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
