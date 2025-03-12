import axios from "axios";

export const BASE_URL = "http://localhost:5000/";
const API_URL = "http://localhost:5000/api";
export const fetchRecipes = async () => {
  const res = await axios.get(`${API_URL}/recipe/`);
  return res.data;
};

export const fetchBlogs = async () => {
  const res = await axios.get(`${API_URL}/blog`);
  return res.data;
};
