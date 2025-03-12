import { useParams } from "react-router-dom";
import { useBlogs } from "../hooks/useBlog";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BASE_URL } from "../api/api";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blogs, isLoading, error } = useBlogs();
  const blog = blogs?.find((r) => r._id === id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const formatData = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <>
      <Navbar />
      <section>
        {blog ? (
          <div className="container mx-auto px-2 sm:px-20 py-16">
            <div className="grid place-items-center gap-4 w-full md:w-[80%] md:mx-auto">
              <div className="blog-date">{formatData}</div>
              <h1 className="blog-title-lg">{blog.title}</h1>
              <div className="w-full">
                <img
                  className="mx-auto rounded-md"
                  src={`${BASE_URL}${blog.image}`}
                  alt={blog.title || "image"}
                />
              </div>
              <hr />

              <p>{blog.content}</p>
            </div>
          </div>
        ) : (
          <p>Blog Not Found</p>
        )}
      </section>
      <Footer />
    </>
  );
};

export default BlogDetails;
