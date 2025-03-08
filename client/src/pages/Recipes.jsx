import axios from "axios";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import Recipe from "../components/Recipe";

const Recipes = () => {
  const fecthRecipes = async () => {
    const res = await axios.get("http://localhost:5000/api/recipe/");
    return res.data;
  };
  const {
    data: recipes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: fecthRecipes,
  });

  if (isLoading)
    return (
      <p className="grid place-items-center h-screen text-2xl">Loading...</p>
    );
  if (error) return <p>{error.message}</p>;
  return (
    <>
      <Navbar />
      <Layout>
        <section className="py-20">
          <div className="container mx-auto px-2 sm:px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.map((recipe) => (
              <Recipe recipe={recipe} key={recipe._id} />
            ))}
          </div>
        </section>
      </Layout>
      <Footer />
    </>
  );
};

export default Recipes;
