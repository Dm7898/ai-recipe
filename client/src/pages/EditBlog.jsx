import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BlogContext } from "../context/blogContext";

const EditBlog = () => {
  const { blogs } = useContext(BlogContext);
  const { id } = useParams();
  const [values, setValues] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!id) return;
    const blog = blogs.find((item) => item._id === id);
    if (blog) {
      setValues({
        title: blog.title || "",
        content: blog.content || 0,
      });
      setPreview(blog.image ? `http://localhost:5000/${blog.image}` : null);
    }
    setLoading(false);
  }, [id, blogs]);

  const [file, setFile] = useState(null);

  const handleImg = (e) => {
    setPreview("");
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);

    if (file) formData.append("image", file);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/blog/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      alert("Data updated Successfully");
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) return <p>Loading...</p>;
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
