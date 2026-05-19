"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Community Empowerment Hub",
    desc: "Equipping individuals with entrepreneurial and vocational skills to promote self-reliance, job creation, and sustainable community growth.",
    img: "/images/5.jpg",
  },
  {
    title: "Education Access Program",
    desc: "Providing learning materials, scholarships, and teacher support to ensure that every child—regardless of background—can access quality education.",
    img: "/images/1.jpg",
  },
  {
    title: "Women Rise Initiative",
    desc: "Supporting women through business training, micro-loans, and leadership development programs that empower them to thrive independently.",
    img: "/images/8.jpg",
  },
  {
    title: "Clean Water & Sanitation Project",
    desc: "Delivering clean water systems, promoting hygiene education, and improving community health through sustainable sanitation practices.",
    img: "/images/11.jpg",
  },
  {
    title: "Green Futures Initiative",
    desc: "Promoting environmental conservation through tree planting, recycling programs, and renewable energy awareness for a cleaner, healthier future.",
    img: "/images/12.jpg",
  },

];

export default function Recent() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -400 : 400,
        behavior: "smooth",
      });
    }
  };

  if (!hasMounted) return null; // Prevent hydration mismatch

  return (
    <section id = "recent" className="relative p-6 bg-white mt-10   ">
      <div className="w-full px-6 md:px-18">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-left mt-18"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#02025f] mb-4">
            See What We’ve Achieved Together
            
          </h2>
          <p className="text-gray-700 mt-5 max-w-2xl">
            Discover how AESTI is driving change through hands-on community
            initiatives, education, and innovation across regions.
          </p>
        </motion.div>
      </div>
      <div className="w-full py-16 pl-3 sm:pl-12 lg:pl-24 pr-0">
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-2 md:gap-4 cursor-pointer custom-scroll-container overflow-x-auto scroll-smooth scrollbar-hide px-1"
          >
            {services.map((service, i) => (
              <div
                key={i}
                className="min-w-[90%] sm:min-w-[65%] md:min-w-[33%] lg:min-w-[35%] h-[600px] relative rounded-2xl overflow-hidden shadow-md group transition-transform duration-500"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 p-6 flex flex-col justify-start gap-3">
                  <h3 className="text-white text-3xl font-extrabold mb-2 mt-4">
                    {service.title}
                  </h3>
                  <p className=" text-md text-[#c4c4c4] font-extrabold mb-4">
                    {service.desc}
                  </p>
                  <button className="bg-[#fea100] text-[#0a2067] px-4 py-2 rounded font-semibold w-max mt-2">
                    Explore
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute -bottom-10  right-6 flex gap-4 z-10">
            <button
              onClick={() => scroll("left")}
              className="bg-[#fea100] p-4 cursor-pointer rounded-full shadow hover:scale-105 transition"
            >
              {/* Left Arrow */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="bg-[#fea100] p-4 rounded-full cursor-pointer shadow hover:scale-105 transition"
            >
              {/* Right Arrow */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
