import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url"; // Import for ES module path handling

import recipeRoutes from "./routes/recipeRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";
// import Recipe from "./models/Recipe.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Convert ES module paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (uploaded images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
    // await updateRecipes();
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

// const updateRecipes = async () => {
//   try {
//     const result = await Recipe.updateMany(
//       {},
//       {
//         $set: {
//           category: "lunch",
//           featured: false,
//           vegetarian: false,
//         },
//       }
//     );
//     console.log(`Upddate Many Successfully count:${result.modifiedCount}`);
//   } catch (err) {
//     console.log(err || "Error");
//   }
// };

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// API routes
app.use("/api/auth", userRoutes);
app.use("/api/recipe", recipeRoutes);
app.use("/api/blog", blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
