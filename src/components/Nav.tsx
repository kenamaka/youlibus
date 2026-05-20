"use client";

import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { joinGroup } from "@/lib/joinGroup";

const Navbar = ({ onDonateClick }: { onDonateClick: () => void }) => {
  const [nav, setNav] = useState(false);

  const toggleNav = () => setNav(!nav);
  const closeNav = () => setNav(false);

  const menuVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  const navItems = [
    { name: "Home", to: "hero" },
    { name: "About", to: "about" },
    { name: "Next Mission", to: "next" },
    { name: "Projects", to: "recent" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white backdrop-blur-md shadow-sm">
      <div className="max-w-[1300px] mx-auto flex justify-between items-center px-4 md:px-12 h-16">
        {/* Logo */}
        <div className="w-25 h-25 flex items-center cursor-pointer">
          <Link to="hero" smooth offset={-80} duration={500}>
            <img
              src="/images/icon.png"
              alt="Logo"
              className="h-full w-full object-contain"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-x-6 font-semibold text-sm items-center text-dark">
          {navItems.map(({ name, to }) => (
            <li key={name} className="relative cursor-pointer group">
              <Link to={to} smooth offset={-80} duration={500}>
                {name}
              </Link>

              {/* underline */}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-secondary group-hover:w-full transition-all duration-300" />
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-x-4 items-center text-sm font-semibold">
          {/* Donate (secondary style) */}
          <motion.button
            onClick={onDonateClick}
            whileHover={{ scale: 1.05 }}
            className="border border-primary text-primary hover:bg-primary hover:text-white rounded-full px-6 py-2 transition"
          >
            Donate
          </motion.button>

          {/* Volunteer (primary style) */}
          <motion.button
            onClick={joinGroup}
            whileHover={{ scale: 1.05 }}
            className="bg-primary text-white hover:bg-primary-dark rounded-full px-6 py-2 transition"
          >
            Volunteer
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <div
          onClick={toggleNav}
          className="md:hidden flex items-center justify-center h-10 w-10 text-2xl cursor-pointer z-50 text-primary"
        >
          {nav ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={nav ? "open" : "closed"}
        variants={menuVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-screen w-[75%] bg-cream z-40 p-8 md:hidden shadow-lg"
      >
        <ul className="flex flex-col gap-8 text-lg font-semibold text-dark mt-8">
          {navItems.map(({ name, to }) => (
            <li key={name}>
              <Link
                to={to}
                smooth
                offset={-80}
                duration={500}
                onClick={closeNav}
              >
                {name}
              </Link>
            </li>
          ))}

          {/* Mobile Buttons */}
          <li>
            <button
              onClick={onDonateClick}
              className="w-full border border-primary text-primary hover:bg-primary hover:text-white rounded-full px-6 py-3 transition"
            >
              Donate
            </button>
          </li>

          <li>
            <button
              onClick={joinGroup}
              className="w-full bg-primary text-white hover:bg-primary-dark rounded-full px-6 py-3 transition"
            >
              Volunteer
            </button>
          </li>
        </ul>
      </motion.div>

      {/* Backdrop */}
      {nav && (
        <motion.div
          onClick={closeNav}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          className="fixed inset-0 bg-black z-30 md:hidden"
        />
      )}
    </nav>
  );
};

export default Navbar;
