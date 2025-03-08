import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const EditRecipe = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const fetchData = async () => {
    const res = await axios.get(`http://localhost:5000/api/recipe/`);
    console.log(res.data);
    return res.data;
  };
  const {
    data: recipes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchData,
  });

  const [values, setValues] = useState({
    title: "",
    time: 0,
    level: "",
    servings: 0,
    steps: [],
    ingredients: [],
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
      });
      if (!file) {
        setPreview(
          recipe.image ? `http://localhost:5000/${recipe.image}` : null
        );
      }
    }
  }, [recipe]);

  //   console.log(values);
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
      await axios.put(`http://localhost:5000/api/recipe/${id}`, recipeData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      alert("Recipe Updated successfully");
      queryClient.invalidateQueries(["recipe", id]);
    },
    onError: () => {
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
      file !== null;

    if (!isChanged) {
      alert("no changes made");
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("time", values.time);
    formData.append("level", values.level);
    formData.append("servings", values.servings);
    formData.append("steps", values.steps || []);
    formData.append("ingredients", values.ingredients || []);
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
