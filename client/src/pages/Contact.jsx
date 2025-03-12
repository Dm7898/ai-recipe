import Books from "../components/Books";
import Footer from "../components/Footer";
import Instgram from "../components/Instgram";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import contactImg from "/contact.jpg";

const Contact = () => {
  return (
    <>
      <Navbar />
      <Layout>
        <section className="pt-20">
          <div className="container mx-auto px-2 sm:px-4 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="">
              <img className="rounded-md" src={contactImg} alt="contact" />
            </div>
            <form className="grid gap-2 md:gap-4 grid-cols-4">
              <h1 className="col-span-4 disply-1">
                Get in
                <span className="title-tag"> touch</span>
              </h1>
              <div className="col-span-2 flex flex-col">
                <label>Full Name</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Jhon Doe"
                  required
                />
              </div>
              <div className="col-span-2 flex flex-col">
                <label>Email</label>
                <input
                  className="input"
                  type="email"
                  placeholder="demo@gmail.com"
                  required
                />
              </div>
              <div className="col-span-2 flex flex-col">
                <label>Phone</label>
                <input
                  className="input"
                  type="tel"
                  placeholder="+91-1234567"
                  required
                />
              </div>
              <div className="col-span-2 flex flex-col">
                <label>Schedule to receive call</label>
                <input
                  className="input"
                  type="text"
                  placeholder="10:00 AM to 4:00 PM"
                  required
                />
              </div>
              <button className="col-span-4 btn-primary">Contact</button>
            </form>
          </div>
        </section>
        <Books />
        <Instgram />
      </Layout>
      <Footer />
    </>
  );
};

export default Contact;
