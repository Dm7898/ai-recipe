import Recipe from "../models/Recipe.js";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const createRecipe = async (req, res) => {
  const { title, category, time, level, steps, servings, ingredients } =
    req.body;
  console.log(req.body);
  const image = req.file
    ? `uploads/recipe/${req.file.filename}`
    : `uploads/recipe/image-1740820532686-114450322.jpg`;
  console.log(image);
  if (
    !title ||
    !category ||
    !time ||
    !level ||
    !steps ||
    !servings ||
    !ingredients
  )
    return res.status(401).json("Fields are required");

  try {
    const recipe = await Recipe.findOne({ title });
    if (recipe) return res.status(400).json("Recipe already exists");
    const newRecipe = new Recipe({
      title,
      image,
      category,
      time,
      level,
      steps,
      servings,
      ingredients,
    });
    await newRecipe.save();
    res.json({
      data: newRecipe,
      message: "Recipe created successfully!",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const image = req.file
    ? `uploads/recipe/${req.file.filename}`
    : `uploads/recipe/image-1740820532686-114450322.jpg`;

  if (!id) return res.status(404).json("Recipe not found");
  console.log(id);
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { ...req.body, image },
      {
        new: true,
      }
    );
    res.status(200).json({
      data: updatedRecipe,
      message: "Recipe updated successfully",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(404).json("Recipe not found");

  try {
    await Recipe.findByIdAndDelete(id);
    res.status(200).json("Recipe Deleted successfully");
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

export const generateRecipe = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: "Recipe content is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const response = await model.generateContent(
      `Create a recipe including:
        - Ingredients
        - Cooking Steps
        - Cooking Time
        - Difficulty Level (Easy, Medium, Hard)
        - Servings
        - Category (Breakfast, Lunch, Drink, Dessert)
        Based on: ${content}`
    );

    const recipe = response.response.text();
    res.status(200).json({ recipe });
  } catch (error) {
    res.status(500).json({ error: error?.message || "Internal server error" });
  }
};
