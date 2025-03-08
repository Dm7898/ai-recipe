import "./App.css";
import RecipeDetails from "./components/RecipeDetails";
import EditRecipe from "./pages/EditRecipe";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import UploadRecipe from "./pages/UploadRecipe";
import EditBlog from "./pages/EditBlog";
import UploadBlog from "./pages/UploadBlog";
import Recipes from "./pages/Recipes";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/edit-recipe/:id" element={<EditRecipe />}></Route>
      <Route path="/recipe/:id" element={<RecipeDetails />} />
      <Route path="/upload-recipe" element={<UploadRecipe />} />
      <Route path="/edit-blog/:id" element={<EditBlog />} />
      <Route path="/upload-blog" element={<UploadBlog />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blogs" element={<Blogs />} />
    </Routes>
  );
}

export default App;
