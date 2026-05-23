"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Empower. Elevate. Excel.",
    description:
      "Unlocking opportunities, support, and platforms that help young women in business rise and thrive.",
    bg: "https://coeahyxujbefeiwxcbkx.supabase.co/storage/v1/object/public/servics-image/41.jpeg",
  },
  {
    id: 2,
    title: "Every Voice Matters",
    description:
      "Creating space where every young woman is seen, valued, and empowered—no matter her background or industry.",
    bg: "https://coeahyxujbefeiwxcbkx.supabase.co/storage/v1/object/public/servics-image/10.jpeg",
  },
  {
    id: 3,
    title: "Stronger Together",
    description:
      "Building powerful partnerships that turn shared vision into real impact for women in business.",
    bg: "https://coeahyxujbefeiwxcbkx.supabase.co/storage/v1/object/public/servics-image/21.jpeg",
  },
  {
    id: 4,
    title: "Think Forward",
    description:
      "Driving bold ideas and smart solutions to help young women succeed in a fast-changing world.",
    bg: "https://coeahyxujbefeiwxcbkx.supabase.co/storage/v1/object/public/servics-image/25.jpeg",
  },
  {
    id: 5,
    title: "Built on Trust",
    description:
      "Leading with honesty, transparency, and integrity in every action, every program, every time.",
    bg: "https://coeahyxujbefeiwxcbkx.supabase.co/storage/v1/object/public/servics-image/8.jpeg",
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

  const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
  return (
    

<section id="hero" className="relative w-full h-screen overflow-hidden">
  {/* Background Slides */}
  <AnimatePresence mode="sync">
    <motion.div
      key={slides[index].id}
      variants={fadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1 }}
      className="absolute inset-0"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${slides[index].bg})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10" />
    </motion.div>
  </AnimatePresence>

  {/* Content */}
  <div className="relative z-10 h-full flex items-center">
    <div className="max-w-[1300px] mx-auto px-6 md:px-12 w-full">
<AnimatePresence mode="wait">
  <motion.div
    key={slides[index].id}
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -40 }}
    transition={{
      type: "spring",
      stiffness: 70,
      damping: 18,
      mass: 0.8,
    }}
    className="max-w-xl bg-white/45 backdrop-blur-xl rounded-2xl p-8 md:p-10 shadow-xl border border-white/20"
  >
    <h1 className="text-3xl md:text-5xl font-extrabold text-dark leading-tight">
      {slides[index].title}
    </h1>

    <p className="mt-4 text-base md:text-lg text-dark/80">
      {slides[index].description}
    </p>

    <div className="mt-6 flex gap-4">
      <button className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition">
        Get Involved
      </button>

      <button className="border border-primary text-primary px-6 py-3 rounded-full hover:bg-primary hover:text-white transition">
        Learn More
      </button>
    </div>
  </motion.div>
</AnimatePresence>
    </div>
  </div>
</section>
  );
}
