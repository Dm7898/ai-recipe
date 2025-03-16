import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBlog, fetchBlogs } from "../api/api";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { toast } from "sonner";

export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const useDeleteBlog = () => {
  const { user } = useContext(AuthContext);
  const usequeryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteBlog(id, user.token),
    onSuccess: () => {
      toast.success("Blog deleted succesfully");
      usequeryClient.invalidateQueries(["blogs"]);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Server error");
    },
  });
};
