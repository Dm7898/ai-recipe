import Recipe from "./Recipe";
import { useRecipes } from "../hooks/useRecipe";
import { useState } from "react";

const FeaturedRecipes = () => {
  const [showLatest, setShowLatest] = useState(true);
  const { data: recipes, isLoading, error } = useRecipes();
  if (isLoading) return <p>Loading..</p>;
  if (error) return <p>Error</p>;
  const featuredRecipes = recipes
    .filter((recipe) => recipe.featured)
    .slice(0, 6);
  const latestRecipes = [...recipes]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);
  const handleClick = () => {
    setShowLatest((prev) => !prev);
  };
  return (
    <section className="featured-properties bg-[#eefff6] py-20">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex justify-between items-center">
          <h2 className="disply-1 my-4">
            Recipes <span className="title-tag">categories</span>
          </h2>
          <button className="btn-primary">All Recipes</button>
        </div>
        <div>
          <div className="flex gap-3 mt-4">
            <button
              className={`cursor-pointer ${showLatest ? "tag-green" : "tag"}`}
              onClick={handleClick}
            >
              Latest Recipes
            </button>
            <button
              className={`cursor-pointer ${showLatest ? "tag" : "tag-green"}`}
              onClick={handleClick}
            >
              Featured Recipes
            </button>
          </div>
          <div className="recipes mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showLatest
              ? latestRecipes.map((recipe, index) => (
                  <Recipe key={index} recipe={recipe} />
                ))
              : featuredRecipes.map((recipe, index) => (
                  <Recipe key={index} recipe={recipe} />
                ))}

            {recipes.length === 0 && <p>Recipes Not Found!</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;
