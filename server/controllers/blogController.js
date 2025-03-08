import Blog from "../models/Blog.js";
import dotenv from "dotenv";

import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const createBlog = async (req, res) => {
  const { title, content } = req.body;
  const image = req.file
    ? `uploads/blog/${req.file.filename}`
    : `uploads/blog/image-1740820532686-114450322.jpg`;
  if (!title || !content)
    return res.status(401).json({ error: "All Fields are required" });
  try {
    const blog = await Blog.findOne({ title });
    if (blog) return res.status(401).json({ message: "Blog already exists" });
    const newBlog = new Blog({
      title,
      content,
      image,
    });
    await newBlog.save();
    res.status(200).json({
      data: newBlog,
      message: "Blog Created Successfully!",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const image = req.file
    ? `uploads/blog/${req.file.filename}`
    : `uploads/blog/image-1740820532686-114450322.jpg`;
  if (!id) return res.status(401).json({ error: "Blog not found" });
  try {
    const updateBlog = await Blog.findByIdAndUpdate(
      id,
      { ...req.body, image },
      {
        new: true,
      }
    );
    res.json({
      data: updateBlog,
      message: "Updated blog successfully",
    });
  } catch (error) {
    res.status(500).json("Server error");
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(401).json({ error: "Blog not found" });
  try {
    await Blog.findByIdAndDelete(id);
    res.json({
      message: "Blog has been deleted",
    });
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

export const genrateBlog = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(401).json({ error: "Content not found" });
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContent(
      `Create a recipe blog(news) including:
          - Title
          - Description wirte more than 500 words
          Based on: ${content}`
    );

    const blog = response.response.text();
    res.json({
      blog,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
