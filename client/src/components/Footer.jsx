import { Link } from "react-router-dom";
import logo from "/recipelogo.png";
import {
  RiFacebookBoxLine,
  RiLinkedinBoxLine,
  RiTwitterLine,
} from "react-icons/ri";
const Footer = () => {
  return (
    <footer className="pt-16">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-5 gap-x-36 gap-y-10 w-full">
          <div className="col-span-1 lg:col-span-2">
            <img src={logo} className="w-28" alt="img" />
            <p className="footer-para">
              Join me on a gastronomic adventure filled with nutritious and
              delicious recipes.
            </p>
            <div className="footer-newsletter">
              <h3 className="footer-title">Sign up newsletter</h3>
              <input
                className="footer-input"
                type="text"
                placeholder="Enter Your Email..."
              />
            </div>
            <p className="copyright">
              © This is a Flowmance template powered by DM
            </p>
          </div>
          <div className="col-span-1 lg:col-span-3">
            <div className="grid grid-cols-3 gap-6">
              <div className="">
                <h2 className="footer-title">Navigation</h2>
                <ul>
                  <li className="li">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="li">
                    <Link to="/about">About me</Link>
                  </li>
                  <li className="li">
                    <Link to="#">Shop</Link>
                  </li>
                  <li className="li">
                    <Link to="/recipes">Recipes</Link>
                  </li>
                  <li className="li">
                    <Link to="#">License</Link>
                  </li>
                  <li className="li">
                    <Link to="#">Legal</Link>
                  </li>
                </ul>
              </div>
              <div className="">
                <h2 className="footer-title">Categories</h2>
                <ul>
                  <li className="li">
                    <Link to="/recipes">Dessert</Link>
                  </li>
                  <li className="li">
                    <Link to="/recipes">Drink</Link>
                  </li>
                  <li className="li">
                    <Link to="/recipes">Lunch</Link>
                  </li>
                  <li className="li">
                    <Link to="/recipes">Breakfast</Link>
                  </li>
                </ul>
              </div>

              <div className="">
                <h2 className="footer-title">Follow me</h2>
                <ul>
                  <li className="flex gap-1.5 li">
                    <span>
                      <RiTwitterLine />
                    </span>
                    <span>
                      <RiFacebookBoxLine />
                    </span>
                    <span>
                      <RiLinkedinBoxLine />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
