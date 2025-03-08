import About from "../components/About";
import Books from "../components/Books";
import Categories from "../components/Categories";
import Clients from "../components/Clients";
import FeaturedBlogs from "../components/FeaturedBlogs";
import FeaturedRecipes from "../components/FeaturedRecipes";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Instgram from "../components/Instgram";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Layout>
        <Hero />
        <Clients />
        <Categories />
        <FeaturedRecipes />
        <Books />
        <About />
        <FeaturedBlogs />
        <Instgram />
      </Layout>
      <Footer />
    </>
  );
};

export default Home;
