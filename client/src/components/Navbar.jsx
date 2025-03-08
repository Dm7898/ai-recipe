import { Link } from "react-router-dom";
import Logo from "../../public/recipelogo.png";

const Navbar = () => {
  return (
    <nav className="container mx-auto px-2 sm:px-4 flex justify-between items-center mt-4">
      <div className="w-34">
        <img src={Logo} alt="logo" />
      </div>
      <ul className="flex gap-8">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/recipes">Recipes</Link>
        </li>
        <li>
          <Link to="/about">About Me</Link>
        </li>
        <li>
          <Link to="/blogs">Blogs</Link>
        </li>
      </ul>
      <div>
        <Link to="/contact" className="btn-primary">
          Contact Me
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
