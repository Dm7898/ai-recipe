import axios from "axios";
// import { useContext } from "react";
// import { AuthContext } from "../context/authContext";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const BASE_URL = "http://localhost:5000/";

export const fetchRecipes = async () => {
  const res = await api.get(`/recipe/`);
  return res.data;
};

export const fetchBlogs = async () => {
  const res = await api.get(`/blog`);
  return res.data;
};

export const deleteRecipe = async (id, token, role) => {
  await api.delete(`/recipe/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: role,
    },
  });
};

export const deleteBlog = async (id, token, role) => {
  await api.delete(`/blog/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: role,
    },
  });
};
