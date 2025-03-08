import { Link } from "react-router-dom";

const Recipe = ({ recipe }) => {
  return (
    <div className="recipe border border-solid border-transparent rounded-xl mb-3">
      <Link to="/">
        <div className="recipe-top relative overflow-hidden">
          <div>
            <img
              src={`http://localhost:5000/${recipe.image}`}
              alt={recipe.title || "recipe img"}
              className="h-80 w-[100%] object-cover rounded-t-md"
            />
          </div>
          <div className="flex justify-center gap-x-3 bg-[#ffffffcc] backdrop-blur-[8px] py-3.5 title-tag font-medium text-base">
            <div className="">{recipe.time}min</div>
            <div className="">{recipe.servers} Servings</div>
            <div className="">{recipe.level}</div>
          </div>
        </div>
      </Link>
      <div className="bg-white py-4">
        <h2 className="title text-xl font-semibold">{recipe.title}</h2>
        <p className="gray my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit...
        </p>
        <Link className="link" to={`/recipe/${recipe._id}`}>
          View Recipe
        </Link>
        <Link className="link ml-3" to={`/edit-recipe/${recipe._id}`}>
          Edit
        </Link>
      </div>
    </div>
  );
};

export default Recipe;
