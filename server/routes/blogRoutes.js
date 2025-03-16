import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import {
  getAllBlogs,
  updateBlog,
  createBlog,
  deleteBlog,
  genrateBlog,
} from "../controllers/blogController.js";
import { authroizedRoles, authToken } from "../middleware/authMiddelware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the upload folder path
const uploadPath = path.join(__dirname, "../uploads/blog");

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

router.get("/", getAllBlogs);

router.post(
  "/",
  upload.single("image"),
  authToken,
  authroizedRoles("admin", "editor"),
  createBlog
);

router.put(
  "/:id",
  upload.single("image"),
  authToken,
  authroizedRoles("admin", "editor"),
  updateBlog
);

router.delete("/:id", authToken, authroizedRoles("admin"), deleteBlog);

router.post(
  "/genrate-blog",
  authToken,
  authroizedRoles("admin", "editor"),
  genrateBlog
);

export default router;
