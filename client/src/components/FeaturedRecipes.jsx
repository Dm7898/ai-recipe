import { useState } from "react";
import Recipe from "./Recipe";

const FeaturedRecipes = () => {
  // const { recipes } = useContext(RecipeContext);
  const [recipes, setRecipes] = useState([]);
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
            <button className="tag-green">Latest Recipes</button>
            <button className="tag">Featured Recipes</button>
          </div>
          <div className="recipes flex flex-wrap mt-12 gap-2-">
            {recipes &&
              recipes.map((recipe, index) => (
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
