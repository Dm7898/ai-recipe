import { useParams } from "react-router-dom";
import { useRecipes } from "../hooks/useRecipe";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { IoTimeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { BsGraphDown } from "react-icons/bs";
import { BASE_URL } from "../api/api";

const RecipeDetails = () => {
  const { id } = useParams();
  const { data: recipes, isLoading, error } = useRecipes();
  const recipe = recipes?.find((r) => r._id === id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <Navbar />
      <section>
        {recipe ? (
          <div className="container mx-auto px-2 sm:px-4 py-16">
            <div className="card shadow-lg rounded-2xl grid gap-6 grid-cols-1 md:grid-cols-2 bg-white p-6">
              {/* Recipe Image */}
              <div className="rounded-2xl overflow-hidden">
                <img
                  className="h-[450px] w-full object-cover transition-transform duration-300 hover:scale-105"
                  src={`${BASE_URL}${recipe.image}`}
                  alt={recipe.title || "Recipe Image"}
                />
              </div>

              {/* Recipe Details */}
              <div className="card-content flex flex-col justify-center p-4">
                <h1 className="text-5xl font-semibold text-[#020202] mb-4">
                  {recipe.title}
                </h1>

                {/* Info Section */}
                <div className="flex flex-wrap items-center gap-6 text-[#00693d]">
                  <div className="flex items-center gap-2">
                    <CgProfile className="text-xl" />
                    <span className="text-lg">{recipe.servings} Servings</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <IoTimeOutline className="text-xl" />
                    <span className="text-lg">{recipe.time} min</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <BsGraphDown className="text-xl" />
                    <span className="text-lg">{recipe.level}</span>
                  </div>
                </div>

                {/* Button */}
                <button className="btn-primary mt-6">View More</button>
              </div>
            </div>

            <div className="w-[60%] mx-auto pt-20">
              <h2 className="title-green mb-4">Steps to cook</h2>
              <ul className="mb-6">
                {recipe?.steps?.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
              <hr />
              <h2 className="title-green my-4">Ingerdients</h2>
              <ul className="mb-4">
                {(Array.isArray(recipe?.ingredients)
                  ? recipe.ingredients
                  : recipe?.ingredients?.split(",") || []
                ).map((ingredient, index) => (
                  <li key={index}>{ingredient.trim()}</li>
                ))}
              </ul>
              <hr />
              <h2 className="title-green my-4">History</h2>
              <p>
                {recipe.history ? recipe.history : <p>No hisotry found!</p>}
              </p>
            </div>
          </div>
        ) : (
          <p>Recipe Not Found</p>
        )}
      </section>
      <Footer />
    </>
  );
};

export default RecipeDetails;
