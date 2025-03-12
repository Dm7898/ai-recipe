import "./App.css";
import RecipeDetails from "./components/RecipeDetails";
import EditRecipe from "./pages/EditRecipe";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import UploadRecipe from "./pages/UploadRecipe";
import EditBlog from "./pages/EditBlog";
import UploadBlog from "./pages/UploadBlog";
import Recipes from "./pages/Recipes";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";
import AboutUs from "./pages/AboutUs";
import BlogDetails from "./components/BlogDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/edit-recipe/:id" element={<EditRecipe />}></Route>
      <Route path="/recipe/:id" element={<RecipeDetails />} />
      <Route path="/blog/:id" element={<BlogDetails />} />
      <Route path="/upload-recipe" element={<UploadRecipe />} />
      <Route path="/edit-blog/:id" element={<EditBlog />} />
      <Route path="/upload-blog" element={<UploadBlog />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blogs" element={<Blogs />} />
    </Routes>
  );
}

export default App;
