import { Link } from "react-router-dom";
import { useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleClick = () => {
    setIsMobile((prev) => !prev);
  };

  return (
    <nav className="container mx-auto px-4 flex justify-between items-center mt-4 relative font-semibold">
      {/* Logo */}
      <div className="w-32">
        <img src="/recipelogo.png" alt="Recipe Logo" className="w-full" />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex gap-8 text-gray-700 font-medium">
        <li>
          <Link to="/" className="hover:text-[#00693d]">
            Home
          </Link>
        </li>
        <li>
          <Link to="/recipes" className="hover:text-[#00693d]">
            Recipes
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-[#00693d]">
            About Me
          </Link>
        </li>
        <li>
          <Link to="/blogs" className="hover:text-[#00693d]">
            Blogs
          </Link>
        </li>
      </ul>
      {/* Contact Button */}
      <div className="ml-auto md:ml-auto lg:ml-0">
        <Link to="/contact" className="btn-primary">
          Contact Me
        </Link>
      </div>
      {/* Mobile Menu Button */}
      <button
        onClick={handleClick}
        className="lg:hidden p-2 text-gray-700"
        aria-label="Toggle navigation menu"
      >
        {isMobile ? <AiOutlineClose size={36} /> : <RiMenu3Fill size={36} />}
      </button>

      {/* Mobile Menu */}
      {isMobile && (
        <ul className="absolute top-16 right-0 bg-white shadow-lg flex flex-col gap-4 p-4 rounded-lg lg:hidden w-full z-20">
          <li>
            <Link
              to="/"
              className="block hover:text-[#00693d]"
              onClick={handleClick}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/recipes"
              className="block hover:text-[#00693d]"
              onClick={handleClick}
            >
              Recipes
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="block hover:text-[#00693d]"
              onClick={handleClick}
            >
              About Me
            </Link>
          </li>
          <li>
            <Link
              to="/blogs"
              className="block hover:text-[#00693d]"
              onClick={handleClick}
            >
              Blogs
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
