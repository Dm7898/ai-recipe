import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const formatDate = (date) =>
    new Date(date)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      })
      .replace(",", "/");
  return (
    <div className="blog w-full md:w-[32%]">
      <div>
        <img
          src={`http://localhost:5000/${blog.image}`}
          alt={blog.title || "blog-image"}
          className="rounded-md"
        />
      </div>
      <div className="mt-3">
        <p className="gray font-semibold">{formatDate(blog.createdAt)}</p>
        <h2 className="blog-title">{blog.title}</h2>
        <div className="mt-3">
          <Link to="/" className="link">
            Read More
          </Link>
          <Link to={`/edit-blog/${blog._id}`} className="link">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blog;
