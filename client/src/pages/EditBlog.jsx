import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogs } from "../hooks/useBlog";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../api/api";

const EditBlog = () => {
  const { data: blogs, isLoading, error } = useBlogs();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [values, setValues] = useState({
    title: "",
    content: "",
  });

  const [preview, setPreview] = useState("");

  const blog = blogs?.find((item) => item._id === id);

  useEffect(() => {
    if (blog) {
      setValues({
        title: blog.title || "",
        content: blog.content || 0,
      });
      setPreview(blog.image ? `${BASE_URL}${blog.image}` : null);
    }
  }, [blog]);

  const [file, setFile] = useState(null);

  const handleImg = (e) => {
    setPreview("");
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const updateBlogMutation = useMutation({
    mutationFn: async (blogData) => {
      await axios.put(`${BASE_URL}api/blog/${id}`, blogData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      alert("Blog updated successfully!");
      navigate(-1);
      queryClient.invalidateQueries(["blog"], id);
    },
    onError: () => {
      console.error("error");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isChanged =
      values.title !== blog.title ||
      values.content !== blog.content ||
      file !== null;

    if (!isChanged) {
      alert("No changes are made");
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);

    if (file) formData.append("image", file);

    updateBlogMutation.mutate(formData);
  };
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <form
      className="flex flex-col mx-auto gap-2 w-full lg:max-w-4xl px-6 bg-amber-100 py-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-4xl font-semibold">Edit blog</h2>
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
      <textarea
        value={values.content}
        onChange={(e) => setValues({ ...values, content: e.target.value })}
        rows={6}
        className="textarea"
      ></textarea>
      <button className="form-btn">Submit</button>
    </form>
  );
};

export default EditBlog;
