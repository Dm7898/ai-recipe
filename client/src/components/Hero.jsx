import { Link } from "react-router-dom";
import HeroImg from "/hero.jpg";
const Hero = () => {
  return (
    <section
      className="bg-right-bottom bg-no-repeat"
      style={{ backgroundImage: "url('/leftgradient.svg')" }}
    >
      <div className="container mx-auto px-2 sm:px-4 flex flex-wrap py-20 ">
        <div className="w-full sm:w-full  lg:w-1/2">
          <div>
            <div className="flex gap-1 items-center font-semibold">
              <div className="bullet-tag"></div>
              <div className="title-tag">Welcome to Ai-Recipe</div>
            </div>
            <h1 className="disply-2 my-6">
              Come, let&apos;s savor the goodness of my{" "}
              <span className="title-tag">nutritious</span>
            </h1>
            <p className="gray font-bold text-base my-4 w-full lg:w-[90%]">
              Discover the art of cooking nutritious and mouthwatering dishes
              with me.
            </p>

            <Link className="inline-block btn-primary mt-2" to="/recipes">
              All Recipes
            </Link>
          </div>
        </div>
        <div className="w-full sm:w-full lg:w-1/2">
          <div className="relative">
            <img
              src={HeroImg}
              className="mx-auto rounded-[100%] w-[480px] min-h-[480px] object-cover"
              alt="img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
