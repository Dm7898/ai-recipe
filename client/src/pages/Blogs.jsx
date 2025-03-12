import Blog from "../components/Blog";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import { useBlogs } from "../hooks/useBlog";
const Blogs = () => {
  const { data: blogs, isLoading, error } = useBlogs();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <Navbar />
      <Layout>
        <section className="py-16">
          <div className="container mx-auto px-2 sm:px-4">
            <h1 className="disply-1 my-6">
              My
              <span className="title-tag"> insight</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-6">
              {blogs?.map((blog) => (
                <Blog key={blog._id} blog={blog} />
              ))}
            </div>
          </div>
        </section>
      </Layout>
      <Footer />
    </>
  );
};

export default Blogs;
