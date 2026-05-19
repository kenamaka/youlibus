"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Empower. Elevate. Excel.",
    description:
      "Unlocking opportunities, support, and platforms that help young women in business rise and thrive.",
    bg: "/images/5.jpg",
  },
  {
    id: 2,
    title: "Every Voice Matters",
    description:
      "Creating space where every young woman is seen, valued, and empowered—no matter her background or industry.",
    bg: "/images/6.jpg",
  },
  {
    id: 3,
    title: "Stronger Together",
    description:
      "Building powerful partnerships that turn shared vision into real impact for women in business.",
    bg: "/images/5.jpeg",
  },
  {
    id: 4,
    title: "Think Forward",
    description:
      "Driving bold ideas and smart solutions to help young women succeed in a fast-changing world.",
    bg: "/images/3.jpeg",
  },
  {
    id: 5,
    title: "Built on Trust",
    description:
      "Leading with honesty, transparency, and integrity in every action, every program, every time.",
    bg: "/images/1.jpeg",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: { x: "100%", opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].id}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[index].bg})` }}
        />
      </AnimatePresence>

      {/* Overlay gradient (subtle, not dark) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/10" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12 w-full">
          <motion.div
            key={slides[index].id + "-content"}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl bg-white/80 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-lg"
          >
            <h1 className="text-3xl md:text-5xl font-extrabold text-dark leading-tight">
              {slides[index].title}
            </h1>

            <p className="mt-4 text-base md:text-lg text-dark/80">
              {slides[index].description}
            </p>

            {/* CTA buttons */}
            <div className="mt-6 flex gap-4">
              <button className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition">
                Get Involved
              </button>

              <button className="border border-primary text-primary px-6 py-3 rounded-full hover:bg-primary hover:text-white transition">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
