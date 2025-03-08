import axios from "axios";
import { useState } from "react";

const UploadRecipe = () => {
  const [values, setValues] = useState({
    title: "",
    time: 0,
    level: "",
    category: "",
    servings: 0,
    steps: [],
    ingredients: [],
  });

  const [preview, setPreview] = useState("");
  const [file, setFile] = useState(null);
  const [aicontent, setAiContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("time", values.time);
    formData.append("level", values.level);
    formData.append("category", values.category);
    formData.append("servings", values.servings);
    formData.append("steps", values.steps || []);
    formData.append("ingredients", values.ingredients || []);
    if (file) formData.append("image", file);

    try {
      await axios.post(`http://localhost:5000/api/recipe/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Data created Successfully");
      setValues({
        title: "",
        time: 0,
        level: "",
        category: "",
        servings: 0,
        steps: [],
        ingredients: [],
      });
      setAiContent("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const genrateAiCnt = async (e) => {
    e.preventDefault();
    if (!values.title) return alert("Please enter the recipe name(title)");
    setLoading(true);
    setAiContent("");
    try {
      const res = await axios.post(
        `http://localhost:5000/api/recipe/genrate-recipe`,
        { content: values.title }
      );
      console.log(res);
      setAiContent(res.data.recipe);
    } catch (error) {
      console.log(error);
      setAiContent("Error While genrating contnet from an ai");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col mx-auto gap-2 w-full lg:max-w-4xl px-6 bg-amber-100 py-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-4xl font-semibold">Create Recipe</h2>
      <input
        type="text"
        placeholder="Title"
        value={values.title}
        className="input"
        onChange={(e) => setValues({ ...values, title: e.target.value })}
      />
      <button
        className="bg-green-500 px-4 py-2 rounded-xs text-white w-50 cursor-pointer"
        onClick={genrateAiCnt}
      >
        {loading ? "Genrating..." : "Generate Ai Recipe"}
      </button>
      {aicontent && (
        <textarea
          className="textarea py-3.5"
          rows={6}
          value={aicontent}
          readOnly
        ></textarea>
      )}
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
      <div className="flex justify-between gap-y-1">
        <div className="w-full sm:w-1/2">
          <label>Time</label>
          <input
            type="number"
            placeholder="Time"
            className="input w-[100%]"
            value={values.time}
            min={0}
            max={120}
            onChange={(e) =>
              setValues({ ...values, time: Number(e.target.value) })
            }
          />
        </div>
        <div className="w-full sm:w-1/2">
          <label>Servings</label>
          <input
            type="number"
            placeholder="Servings"
            className="input w-[100%]"
            value={values.servings}
            min={0}
            max={10}
            onChange={(e) =>
              setValues({ ...values, servings: Number(e.target.value) })
            }
          />
        </div>
      </div>
      <select
        className="list"
        value={values.level}
        onChange={(e) => setValues({ ...values, level: e.target.value })}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
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

export default UploadRecipe;
