import { useState } from "react";
import Blog from "./Blog";

const FeaturedBlogs = () => {
  // const { blogs } = useContext(BlogContext);
  const [blogs, setBlogs] = useState([]);
  return (
    <section className="blogs py-20">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex flex-wrap justify-between">
          <h2 className="disply-1">My insight</h2>
          <button className="btn-primary">All Posts</button>
        </div>
        <div className="flex flex-wrap mt-12 gap-4.5">
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
