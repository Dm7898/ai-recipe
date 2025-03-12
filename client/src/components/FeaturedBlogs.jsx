import Blog from "./Blog";
import { useBlogs } from "../hooks/useBlog";
const FeaturedBlogs = () => {
  const { data: blogs, isLoading, error } = useBlogs();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <section className="blogs py-20">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex flex-wrap justify-between items-center">
          <h2 className="disply-1">My insight</h2>
          <button className="btn-primary">All Posts</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 gap-x-4 gap-y-6">
          {blogs.length > 0 &&
            blogs
              ?.slice(0, 3)
              ?.map((blog, index) => <Blog key={index} blog={blog} />)}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
