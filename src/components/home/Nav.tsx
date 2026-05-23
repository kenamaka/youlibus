"use client";

import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { joinGroup } from "@/lib/joinGroup";
import Logo from '@/src/components/home/Logo'
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
    { name: "About Us", to: "about" },
    { name: "Our Impact", to: "next" },
    { name: "Upcoming Events", to: "recent" },
    { name: "Who we are", to: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white backdrop-blur-xl "

    >
      <div className="max-w-[1300px] mx-auto flex justify-between items-center px-4 md:px-12 h-16">

        {/* Logo */}
        <div className="w-12 h-12 flex items-center cursor-pointer">
          <Link to="hero" smooth offset={-80} duration={500}>
            <Logo/>
          </Link>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-x-8 text-sm font-medium"
          style={{ color: "var(--foreground)" }}
        >
          {navItems.map(({ name, to }) => (
            <li key={name} className="relative cursor-pointer group">
              <Link to={to} smooth offset={-80} duration={500}>
                {name}
              </Link>              {/* underline */}
              <span
                className="absolute left-0 -bottom-1 h-[2px] w-0 group-hover:w-full transition-all duration-300"
                style={{ background: "var(--color-primary)" }}
              />
            </li>
          ))}
        </ul>

            {/* Mobile Toggle */}
        <div
          onClick={toggleNav}
          className="md:hidden flex items-center justify-center h-10 w-10 text-2xl cursor-pointer"
          style={{ color: "var(--color-primary)" }}
        >
          {nav ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={nav ? "open" : "closed"}
        variants={menuVariants}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="fixed top-0 left-0 h-screen w-[78%] backdrop-blur-2xl border-r p-8 md:hidden shadow-xl"
        style={{
          background: "rgba(245, 245, 247, 0.95)",
          borderColor: "var(--color-border)",
        }}
      >
        <ul
          className="flex flex-col gap-8 text-lg font-medium mt-10"
          style={{ color: "var(--foreground)" }}
        >
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