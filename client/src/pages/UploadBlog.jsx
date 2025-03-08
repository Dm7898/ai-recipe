import axios from "axios";
import { useState } from "react";

const UploadBlog = () => {
  const [values, setValues] = useState({
    title: "",
    content: "",
  });
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState(null);
  const [aicontent, setAiContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImg = (e) => {
    setPreview("");
    const file = e.target.files[0];
    if (!file) return alert("Please Upload a Image");
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a image!");
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);

    if (file) formData.append("image", file);

    try {
      const res = await axios.post(
        `http://localhost:5000/api/blog/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      alert("Data uploaded Successfully");
      setValues({
        title: "",
        content: "",
      });
      setFile(null);
      setPreview("");
      setAiContent("");
    } catch (error) {
      console.error(error);
      alert(
        error?.response?.data?.message ||
          "Error from server side please try again later"
      );
    }
  };

  const genrateAiCnt = async (e) => {
    e.preventDefault();
    if (!values.title) return alert("Please enter the blog title");
    setLoading(true);
    setAiContent("");
    try {
      const res = await axios.post(
        `http://localhost:5000/api/blog/genrate-blog`,
        { content: values.title }
      );
      console.log(res);
      setAiContent(res.data.blog);
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
      <h2 className="text-4xl font-semibold">Edit blog</h2>
      <input
        type="text"
        placeholder="Title"
        value={values.title}
        className="input"
        onChange={(e) => setValues({ ...values, title: e.target.value })}
        required
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
      <textarea
        value={values.content}
        onChange={(e) => setValues({ ...values, content: e.target.value })}
        rows={6}
        className="textarea"
        required
      ></textarea>
      <button className="form-btn">Submit</button>
    </form>
  );
};

export default UploadBlog;
