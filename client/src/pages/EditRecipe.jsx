import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../api/api";
import { useRecipes } from "../hooks/useRecipe";

const EditRecipe = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data: recipes, isLoading, error } = useRecipes();

  const [values, setValues] = useState({
    title: "",
    time: 0,
    level: "",
    servings: 0,
    steps: [],
    ingredients: [],
    category: "",
    featured: false,
    vegetarian: false,
  });

  const [preview, setPreview] = useState("");

  const recipe = recipes?.find((item) => item._id === id);
  useEffect(() => {
    if (recipe) {
      setValues({
        title: recipe.title || "",
        time: recipe.time || 0,
        level: recipe.level || "",
        servings: recipe.servings || 0,
        steps:
          typeof recipe.steps === "string"
            ? JSON.parse(recipe.steps)
            : recipe.steps || [],
        ingredients:
          typeof recipe.ingredients === "string"
            ? JSON.parse(recipe.ingredients)
            : recipe.ingredients || [],
        category: recipe.category || "",
        featured: recipe.featured || false,
        vegetarian: recipe.vegetarian || false,
      });
      if (!file) {
        setPreview(recipe.image ? `${BASE_URL}${recipe.image}` : null);
      }
    }
  }, [recipe]);

  const [file, setFile] = useState(null);

  const handleImg = (e) => {
    setPreview("");
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const updateRecipemutation = useMutation({
    mutationFn: async (recipeData) => {
      await axios.put(`${BASE_URL}api/recipe/${id}`, recipeData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      alert("Recipe Updated successfully");
      queryClient.invalidateQueries(["recipe", id]);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const isChanged =
      values.title !== recipe.title ||
      values.time !== recipe.time ||
      values.level !== recipe.level ||
      values.servings !== recipe.servings ||
      JSON.stringify(values.steps) !== JSON.stringify(recipe?.steps) ||
      JSON.stringify(values.ingredients) !==
        JSON.stringify(recipe?.ingredients) ||
      values.category !== recipe.category ||
      values.featured !== recipe.featured ||
      values.vegetarian !== recipe.vegetarian ||
      file !== null;

    if (!isChanged) {
      alert("no changes made");
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("time", values.time);
    formData.append("level", values.level);
    formData.append("category", values.category);
    formData.append("servings", values.servings);
    formData.append("steps", values.steps || []);
    formData.append("ingredients", values.ingredients || []);
    formData.append("featured", values.featured);
    formData.append("vegetarian", values.vegetarian);
    if (file) {
      formData.append("image", file);
    }
    updateRecipemutation.mutate(formData);
  };
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <form
      className="flex flex-col mx-auto gap-2 w-full lg:max-w-4xl px-6 bg-amber-100 py-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-4xl font-semibold">Edit Recipe</h2>
      <input
        type="text"
        placeholder="Title"
        value={values.title}
        className="input"
        onChange={(e) => setValues({ ...values, title: e.target.value })}
      />
      <div className="flex gap-2 items-center">
        {preview && (
          <img
            src={preview}
            className="w-32 h-32 rounded-md"
            alt="image preview"
          />
        )}
        <input
          type="file"
          className="file"
          accept="image/*"
          onChange={handleImg}
        />
      </div>
      <input
        type="number"
        placeholder="Time"
        className="input"
        value={values.time}
        min={0}
        max={120}
        onChange={(e) => setValues({ ...values, time: Number(e.target.value) })}
      />
      <select
        className="list"
        value={values.level}
        onChange={(e) => setValues({ ...values, level: e.target.value })}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <input
        type="number"
        placeholder="Servings"
        className="input"
        value={values.servings}
        min={0}
        max={10}
        onChange={(e) =>
          setValues({ ...values, servings: Number(e.target.value) })
        }
      />
      <select
        className="list"
        value={values.category}
        onChange={(e) => setValues({ ...values, category: e.target.value })}
      >
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="drink">Drink</option>
        <option value="dessert">Dessert</option>
      </select>
      <div className="flex gap-2">
        <div className="flex gap-1">
          <input
            type="checkbox"
            name="featured"
            checked={values.featured}
            onChange={(e) =>
              setValues({ ...values, featured: e.target.checked })
            }
          />
          <span>Featured</span>
        </div>
        <div className="flex gap-1">
          <input
            type="checkbox"
            name="vegetarian"
            checked={values.vegetarian}
            onChange={(e) =>
              setValues({ ...values, vegetarian: e.target.checked })
            }
          />
          <span>Vegetarian</span>
        </div>
      </div>
      <textarea
        rows={4}
        className="textarea"
        placeholder="Enter Steps (comma separated)"
        value={values.steps.join(",")}
        onChange={(e) =>
          setValues({ ...values, steps: e.target.value.split(",") })
        }
      ></textarea>
      <textarea
        rows={4}
        className="textarea"
        placeholder="Enter Ingrediants (comma separated)"
        value={values.ingredients.join(",")}
        onChange={(e) =>
          setValues({ ...values, ingredients: e.target.value.split(",") })
        }
      ></textarea>
      <button className="form-btn">Submit</button>
    </form>
  );
};

export default EditRecipe;
