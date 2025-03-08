import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams();
  // const { recipes } = useContext(RecipeContext);
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState({});
  useEffect(() => {
    const recipe = recipes.find((r) => r._id === id);
    if (recipe) setRecipe(recipe);
  }, [id, recipes]);

  return (
    <section>
      {recipe ? (
        <div className="container mx-auto px-2 sm:px-4">
          <div className="card shadow-lg rounded-2xl flex flex-wrap">
            <div className="w-full md:w-1/2">
              <img
                src={`http://localhost:5000/${recipe.image}`}
                alt={recipe.title || "image"}
              />
            </div>
            <div className="card-content w-full md:w-1/2">
              <div className="flex gap-2">
                <span>Servies:{recipe.servings}</span>
                <span>Cooking Time:{recipe.time}min</span>
                <span>Level:{recipe.level}</span>
              </div>
              <h1>{recipe.title}</h1>
            </div>
          </div>
          <hr />
          <h2 className="title-green">Steps to cook</h2>
          <ol className="list-decimal pl-5">
            {recipe?.steps?.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          <hr />
          <h2 className="title-green">Ingerdients</h2>
          <ul>
            {(Array.isArray(recipe?.ingredients)
              ? recipe.ingredients
              : recipe?.ingredients?.split(",") || []
            ).map((ingredient, index) => (
              <li key={index}>{ingredient.trim()}</li>
            ))}
          </ul>
          <h2 className="title-green">History</h2>
          <p>{recipe.history ? recipe.history : <p>No hisotry found!</p>}</p>
        </div>
      ) : (
        <p>Recipe Not Found</p>
      )}
    </section>
  );
};

export default RecipeDetails;
