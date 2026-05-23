"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const menu = [
  {
    title: "About Us",
    items: ["Mission", "Vision", "Core Values", "Who we are"],
  },
  {
    title: "Who We Are",
    items: [
      "Founder",
      "Board of Trustees",
      "Advisory Council",
      "Heads of Directorates",
      "State Coordinators",
      "Country Directors",
      "Regional Directors",
      "Our Partners",
    ],
  },
  {
    title: "What We Do",
    items: [
      "Our Outreaches",
      "Annual YOULIBUS International Conference",
      "Yearly Calendar",
      "Our Events",
      "Our Collaborations",
      "Register for any Event",
    ],
  },
  {
    title: "Mentoring",
    items: [
      "Become a YOULIBUS Mentor",
      "Become a YOULIBUS Mentee",
      "How Mentorship Works",
    ],
  },
  {
    title: "YOULIBUS Awards",
    items: [
      "Nomination / Eligibility",
      "Vote",
      "Award Criteria",
      "Past Winners",
    ],
  },
  {
    title: "Resources",
    items: ["Photos", "Videos", "Blog", "Publications", "FAQs"],
  },
];

export default function Navbar() {
  // ✅ FIX 1: proper typing
  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ FIX 2: separate dropdown state (number or null)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-pink-700">
          YOULIBUS
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex gap-8">
          {menu.map((item, idx) => (
            <div
              key={idx}
              className="relative cursor-pointer"
              onMouseEnter={() => setActiveDropdown(idx)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="flex items-center gap-1 text-gray-700 hover:text-pink-700 font-medium">
                {item.title}
                <FiChevronDown size={16} />
              </div>

              {/* Dropdown */}
              {activeDropdown === idx && (
                <div className="absolute left-0 top-full mt-3 w-64 bg-white shadow-xl rounded-xl transition-all duration-300">
                  <ul className="p-4 space-y-2">
                    {item.items.map((sub, i) => (
                      <li
                        key={i}
                        className="text-sm text-gray-600 hover:text-pink-700 cursor-pointer"
                      >
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="lg:hidden text-gray-700 text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t px-6 py-4 space-y-3">
          {menu.map((item, idx) => {
            const isOpen = activeDropdown === idx;

            return (
              <div key={idx}>
                <button
                  onClick={() =>
                    setActiveDropdown(isOpen ? null : idx)
                  }
                  className="flex justify-between w-full text-left font-medium text-gray-700 py-2"
                >
                  {item.title}
                  <FiChevronDown
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <ul className="pl-4 pb-2 space-y-2">
                    {item.items.map((sub, i) => (
                      <li
                        key={i}
                        className="text-sm text-gray-600 hover:text-pink-700 cursor-pointer"
                      >
                        {sub}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}
    </nav>
  );
}