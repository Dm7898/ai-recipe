import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import {
  getAllRecipes,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  generateRecipe,
} from "../controllers/recipeController.js";
import { authroizedRoles, authToken } from "../middleware/authMiddelware.js";

// Convert ES module paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the upload folder path
const uploadPath = path.join(__dirname, "../uploads/recipe");

// Ensure the uploads directory exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("✅ Upload directory created:", uploadPath);
} else {
  console.log("✔️ Upload directory already exists:", uploadPath);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

const router = express.Router();

// Routes
router.get("/", getAllRecipes);
router.post(
  "/",
  upload.single("image"),
  authToken,
  authroizedRoles("admin", "editor"),
  createRecipe
);
router.put(
  "/:id",
  upload.single("image"),
  authToken,
  authroizedRoles("admin", "editor"),
  updateRecipe
);
router.delete("/:id", authToken, authroizedRoles("admin"), deleteRecipe);
router.post(
  "/genrate-recipe",
  // authToken,
  // authroizedRoles("admin", "editor"),
  generateRecipe
);

export default router;
