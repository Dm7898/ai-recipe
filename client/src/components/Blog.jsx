import { Link } from "react-router-dom";
import { BASE_URL } from "../api/api";

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
    <div className="blog w-full">
      <div>
        <img
          src={`${BASE_URL}${blog.image}`}
          alt={blog.title || "blog-image"}
          className="rounded-md w-full h-auto max-h-80 object-cover aspect-[4/3] md:aspect-[16/9]"
        />
      </div>
      <div className="mt-3">
        <p className="gray font-semibold">{formatDate(blog.createdAt)}</p>
        <h2 className="blog-title-sm">{blog.title}</h2>
        <div className="mt-3">
          <Link to={`/blog/${blog._id}`} className="link">
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
