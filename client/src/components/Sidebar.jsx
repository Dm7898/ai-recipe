import { useState } from "react";
import { MdDashboard, MdMenu, MdClose, MdSettings } from "react-icons/md";
import { FaBook, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle clicks outside the sidebar
  const handleOverlayClick = (e) => {
    if (e.target.id === "sidebar-overlay") {
      setIsOpen(false);
    }
  };

  return (
    <div>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          id="sidebar-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#eefff6] text-[#26272b] w-64 p-5 transform 
        ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform duration-300 ease-in-out md:translate-x-0`}
      >
        {/* Close Button for Mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-700 md:hidden"
        >
          <MdClose size={24} />
        </button>

        {/* Sidebar Logo */}
        <div className="w-28 mb-4">
          <Link to="/">
            <img src="/recipelogo.png" alt="Recipe Logo" className="w-full" />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="space-y-4">
            {[
              {
                icon: <MdDashboard size={20} />,
                label: "Dashboard",
                to: "/dashboard",
              },
              {
                icon: <FaBook size={20} />,
                label: "Recipes",
                to: "/manage-recipes",
              },
              {
                icon: <FaUser size={20} />,
                label: "Blogs",
                to: "/manage-blogs",
              },
              { icon: <MdSettings size={20} />, label: "Profile", to: "#" },
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3 p-2 hover:bg-[#00693d] hover:text-white transition-all duration-300 ease-in-out rounded-md cursor-pointer"
              >
                {item.icon}
                <Link className="w-[80%]" to={item.to}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-screen p-5 md:ml-64">
        {/* Open Button for Mobile */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 bg-gray-900 text-white rounded-md"
        >
          <MdMenu size={24} />
        </button>
      </div>
    </div>
  );
}
