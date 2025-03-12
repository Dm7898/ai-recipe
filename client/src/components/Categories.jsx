import { Link } from "react-router-dom";

const Categories = () => {
  const data = [
    {
      category: "breakfast",
      img: "/categories/breakfast.png",
      path: "/breakfast",
    },
    {
      category: "lunch",
      img: "/categories/lunch.png",
      path: "/lunch",
    },
    {
      category: "drink",
      img: "/categories/drink.png",
      path: "/drink",
    },
    {
      category: "desert",
      img: "/categories/dessert.png",
      path: "/desert",
    },
  ];
  return (
    <section className="categories gap-3 pt-20 pb-16 text-center">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex gap-1 items-center justify-center font-semibold">
          <div className="bullet-tag"></div>
          <div className="title-tag">Welcome to Ai-Recipe</div>
        </div>
        <h2 className="disply-1 my-4">
          Recipes <span className="title-tag">categories</span>
        </h2>
        <div className="flex flex-wrap sm:flex-row justify-around mt-14 gap-4 md:gap-4 lg:gap-0">
          {data.map((cat, index) => (
            <div
              key={index}
              className="bg-[#e8fcf1] text-[#00693d]  text-center rounded-[100%] w-36 h-36 sm:w-52 sm:h-52 flex flex-col justify-center items-center transition-all duration-300 hover:hue-rotate-180 hover:scale-110"
            >
              <Link to="/recipes">
                <img
                  src={cat.img}
                  className="w-15 sm:w-20"
                  alt={cat.category}
                />
                <h3 className="font-semibold capitalize mt-4">
                  {cat.category}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
