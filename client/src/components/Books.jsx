import BookImg from "/book.png";
const Books = () => {
  return (
    <section className="books py-20">
      <div
        className="container mx-auto py-12 px-2 sm:px-4 flex flex-wrap items-center flex-column-reverse md:flex-column lg:flex-column gap-y-4 rounded-2xl bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: "url('/gradient.svg')" }}
      >
        <div className="w-full md:w-1/2 px-4">
          <div className="flex gap-1 items-center font-semibold">
            <div className="bullet-tag-white"></div>
            <div className="title-tag-white">Shop my premium recipe</div>
          </div>
          <h1 className="display-3 my-6">
            Discover and indulge in my exclusive collection of gourmet recipes.
          </h1>
          <button className="btn-white-primary">Shop Now</button>
        </div>
        <div className="w-full md:w-1/2 mt-6">
          <img
            src={BookImg}
            alt="image"
            className="w-[60%] md:w-[80%] mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Books;
