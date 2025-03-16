import { Link } from "react-router-dom";
import { BASE_URL } from "../api/api";
import dessert from "/categories/dessert.png";
import lunch from "/categories/lunch.png";
import breakfast from "/categories/breakfast.png";
import drink from "/categories/drink.png";

const Recipe = ({ recipe }) => {
  return (
    <div className="recipe border border-solid border-transparent rounded-xl mb-3 shadow">
      <Link to="/">
        <div className="recipe-top relative overflow-hidden">
          <div className="relative">
            <img
              src={`${BASE_URL}${recipe.image}`}
              alt={recipe.title || "recipe img"}
              className="h-80 w-[100%] object-cover rounded-t-md"
            />
            <div className="absolute top-3 right-2 text-[#26272b] bg-white rounded-[100px] py-2 px-6 flex gap-2 items-center">
              {recipe.category === "lunch" && (
                <img className="w-[20px]" src={lunch} alt="lunch icon" />
              )}
              {recipe.category === "dessert" && (
                <img className="w-[20px]" src={dessert} alt="dessert icon" />
              )}
              {recipe.category === "drink" && (
                <img className="w-[20px]" src={drink} alt="breakfast icon" />
              )}
              {recipe.category === "breakfast" && (
                <img
                  className="w-[20px]"
                  src={breakfast}
                  alt="breakfast icon"
                />
              )}
              <span className="capitalize">{recipe.category}</span>
            </div>
          </div>
          <div className="flex absolute top-auto  bottom-0 left-0 right-0 justify-center gap-x-6 bg-[#ffffffcc] backdrop-blur-[8px] py-3.5 title-tag font-medium text-base">
            <div className="">{recipe.time}min</div>
            <div className="">{recipe.servings} Servings</div>
            <div className="capitalize">{recipe.level}</div>
          </div>
        </div>
      </Link>
      <div className="bg-white px-6 py-7 ">
        <h2 className="title text-xl font-semibold">{recipe.title}</h2>
        <p className="gray my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit...
        </p>
        <Link className="link" to={`/recipe/${recipe._id}`}>
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default Recipe;
