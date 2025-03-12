import About from "../components/About";
import Books from "../components/Books";
import Clients from "../components/Clients";
import Footer from "../components/Footer";
import Instgram from "../components/Instgram";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <Layout>
        <div className="py-20">
          <About />
          <Clients />
          <Books />
          <Instgram />
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default AboutUs;
