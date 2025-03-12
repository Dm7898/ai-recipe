import Image1 from "/instgram/image1.jpg";
import Image2 from "/instgram/image2.jpg";
import Image3 from "/instgram/image3.jpg";
import Image4 from "/instgram/image4.jpg";
import Image5 from "/instgram/image5.jpg";
import { FaInstagram } from "react-icons/fa";

const Instgram = () => {
  return (
    <section className="instgram bg-[#e8fcf1] py-18">
      <div className="container mx-auto px-2 sm:px-4">
        <h3 className="text-center font-semibold mb-4 flex items-center gap-1 justify-center">
          <span>
            <FaInstagram />
          </span>{" "}
          Instagram
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {[Image1, Image2, Image3, Image4, Image5].map((img, index) => (
            <div
              className="relative group overflow-hidden rounded-lg"
              key={index}
            >
              <img
                src={img}
                className="w-full h-40 object-cover rounded-lg transition duration-300 transform group-hover:scale-105"
                alt={`insta-img-${index}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instgram;
