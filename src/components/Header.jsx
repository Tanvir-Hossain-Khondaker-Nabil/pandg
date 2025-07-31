import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../assets/Logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/insights", label: "Insights" },
    { to: "/corporatesustainability", label: "Corporate Sustainability" },
    { to: "/career", label: "Career" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto h-24 flex items-center justify-between px-4 md:px-8 lg:px-32">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Icon with simple rotation */}
        <motion.div
          className="md:hidden text-3xl text-gray-700 cursor-pointer"
          onClick={toggleMenu}
          animate={{ rotate: menuOpen ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          aria-label="Toggle menu"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && toggleMenu()}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </motion.div>
      </div>

      {/* Mobile Dropdown with simple motion */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden flex flex-col items-center px-4 gap-4 pb-4 text-gray-700 font-medium bg-white w-full shadow-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={toggleMenu}
                className="w-full text-center py-2 rounded hover:bg-gray-100 transition-colors"
              >
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
