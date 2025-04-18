import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    category: {
      type: String,
      enum: ["dessert", "drink", "breakfast", "lunch", "dinner"],
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    level: {
      type: String,
      required: true,
      enum: ["easy", "medium", "hard"],
    },
    steps: {
      type: [String],
      required: true,
    },
    servings: {
      type: Number,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    history: {
      type: String,
      default: "No history available..",
    },
    vegetarian: {
      type: Boolean,
      default: false,
    },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);
export default Recipe;
