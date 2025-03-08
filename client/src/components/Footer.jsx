import logo from "/recipelogo.png";
const Footer = () => {
  return (
    <footer className="pt-16">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full">
          <div className="">
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
          <div className="grid grid-cols-3 gap-6">
            <div className="">
              <h2 className="footer-title">Navigation</h2>
              <ul>
                <li className="li">Home</li>
                <li className="li">About me</li>
                <li className="li">Shop</li>
                <li className="li">Recipes</li>
                <li className="li">License</li>
                <li className="li">Legal</li>
              </ul>
            </div>
            <div className="">
              <h2 className="footer-title">Categories</h2>
              <ul>
                <li className="li">Dessert</li>
                <li className="li">Drink</li>
                <li className="li">Lunch</li>
                <li className="li">Breakfast</li>
              </ul>
            </div>

            <div className="">
              <h2 className="footer-title">Follow me</h2>
              <li className="flex gap-1.5 li">
                <span>x</span>
                <span>f</span>
                <span>in</span>
              </li>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
