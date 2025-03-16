import { Link } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { RiMenu3Fill, RiUserFill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logOut } = useContext(AuthContext);

  // Toggle mobile menu
  const handleClick = () => setIsMobile((prev) => !prev);

  // Toggle profile dropdown
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="container mx-auto px-4 flex justify-between items-center mt-4 relative font-medium">
      {/* Logo */}
      <Link to="/" className="w-32">
        <img src="/recipelogo.png" alt="Recipe Logo" className="w-full" />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex gap-8 text-gray-700">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/recipes" className="hover:underline">
            Recipes
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:underline">
            About Me
          </Link>
        </li>
        <li>
          <Link to="/blogs" className="hover:underline">
            Blogs
          </Link>
        </li>
      </ul>

      {/* User Actions */}
      <div className="hidden lg:flex items-center gap-4">
        <Link to="/contact" className="md:inline-block btn-primary">
          Contact Me
        </Link>

        {user?.role ? (
          <div className="relative" ref={dropdownRef}>
            {/* Profile Icon */}
            <button
              className="flex items-center gap-2 cursor-pointer"
              onClick={toggleDropdown}
            >
              <RiUserFill size={24} className="text-gray-700" />
              <span className="text-gray-700">{user.role}</span>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg p-2">
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logOut}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="btn-primary">
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button onClick={handleClick} className="lg:hidden p-2 text-gray-700">
        {isMobile ? <AiOutlineClose size={30} /> : <RiMenu3Fill size={30} />}
      </button>

      {/* Mobile Menu */}
      {isMobile && (
        <div className="absolute top-16 right-0 w-full bg-white shadow-md rounded-lg p-6 flex flex-col items-center gap-4 lg:hidden">
          <Link to="/" className="block" onClick={handleClick}>
            Home
          </Link>
          <Link to="/recipes" className="block" onClick={handleClick}>
            Recipes
          </Link>
          <Link to="/about" className="block" onClick={handleClick}>
            About Me
          </Link>
          <Link to="/blogs" className="block" onClick={handleClick}>
            Blogs
          </Link>
          <Link
            to="/contact"
            className="btn-primary w-full text-center"
            onClick={handleClick}
          >
            Contact Me
          </Link>

          {user ? (
            <div className="flex flex-col items-center w-full">
              <button
                className="flex items-center gap-2"
                onClick={toggleDropdown}
              >
                <RiUserFill size={24} className="text-gray-700" />
                <span className="text-gray-700">{user.role}</span>
              </button>
              {showDropdown && (
                <div className="w-full bg-white shadow-md rounded-lg p-2 mt-2 text-center">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logOut}
                    className="block px-4 py-2 w-full  hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="btn-primary w-full text-center"
              onClick={handleClick}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
