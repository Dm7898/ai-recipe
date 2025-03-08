import Footer from "../components/Footer";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <Layout>
        <section className="py-20">
          <div className="container mx-auto px-2 sm:px-4">
            <h2>About</h2>
          </div>
        </section>
      </Layout>
      <Footer />
    </>
  );
};

export default About;
