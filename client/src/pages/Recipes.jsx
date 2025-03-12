import Footer from "../components/Footer";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Recipe from "../components/Recipe";
import Books from "../components/Books";
import Instgram from "../components/Instgram";
import { useRecipes } from "../hooks/useRecipe";
const Recipes = () => {
  const { data: recipes, isLoading, error } = useRecipes();
  if (isLoading)
    return (
      <p className="grid place-items-center h-screen text-2xl">Loading...</p>
    );
  if (error) return <p>{error.message}</p>;
  return (
    <>
      <Navbar />
      <Layout>
        <section className="pt-16">
          <div className="container mx-auto px-2 sm:px-4">
            <h1 className="disply-1 my-6 ">
              All
              <span className="title-tag"> Recipes</span>
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipes.map((recipe) => (
                <Recipe recipe={recipe} key={recipe._id} />
              ))}
            </div>
          </div>
        </section>
        <Books />
        <Instgram />
      </Layout>
      <Footer />
    </>
  );
};

export default Recipes;
