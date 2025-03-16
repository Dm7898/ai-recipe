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
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import NotAuthorised from "./components/NotAuthorised";
import Dashboard from "./pages/Dashboard";
import ManageRecipes from "./pages/ManageRecipes";
import ManageBlogs from "./pages/ManageBlogs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route
        path="/edit-recipe/:id"
        element={
          <ProtectedRoute allowedRoles={["admin", "editor"]}>
            <EditRecipe />
          </ProtectedRoute>
        }
      ></Route>
      <Route path="/recipe/:id" element={<RecipeDetails />} />
      <Route path="/blog/:id" element={<BlogDetails />} />
      <Route
        path="/upload-recipe"
        element={
          <ProtectedRoute allowedRoles={["admin", "editor"]}>
            <UploadRecipe />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-blog/:id"
        element={
          <ProtectedRoute allowedRoles={["admin", "editor"]}>
            <EditBlog />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload-blog"
        element={
          <ProtectedRoute allowedRoles={["admin", "editor"]}>
            <UploadBlog />
          </ProtectedRoute>
        }
      />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/not-authorised" element={<NotAuthorised />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin", "editor"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-recipes"
        element={
          <ProtectedRoute allowedRoles={["admin", "editor"]}>
            <ManageRecipes />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/manage-blogs"
        element={
          <ProtectedRoute allowedRoles={["admin", "editor"]}>
            <ManageBlogs />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}

export default App;
