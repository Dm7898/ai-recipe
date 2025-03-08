import axios from "axios";
import { createContext, useEffect, useState } from "react";

const BlogContext = createContext();

const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/api/blog`);
      const data = await res.data;
      console.log(data);
      setBlogs(data);
    };
    fetchData();
  }, []);

  return (
    <BlogContext.Provider value={{ blogs }}>{children}</BlogContext.Provider>
  );
};

export { BlogContext, BlogProvider };
