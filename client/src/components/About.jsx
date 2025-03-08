import { Link } from "react-router-dom";
import aboutImg from "/aboutus.jpg";

const About = () => {
  return (
    <section className="about">
      <div className="container mx-auto px-2 sm:px-4 flex flex-wrap flex-row md:flex-row-reverse">
        <div className="w-full md:w-1/2">
          <img src={aboutImg} alt="img" className="rounded-sm" />
        </div>
        <div className="w-full md:w-1/2">
          <div className="flex gap-1 items-center font-semibold">
            <div className="bullet-tag"></div>
            <div className="title-tag">About me</div>
          </div>
          <h1 className="disply-1 my-6">
            Lucia Delgado&apos;s journey from kitchen whiz to digital
            <span className="title-tag">culinary star</span>
          </h1>
          <div className="mt-3">
            <Link to="/about" className="btn-primary">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
