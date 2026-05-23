"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import KeyFocusAreas from "../layout/KeyFocusAreas";

const services = [
  {
    title: "Community Empowerment Hub",
    desc: "Equipping individuals with entrepreneurial and vocational skills to promote self-reliance and sustainable growth.",
    img: "https://coeahyxujbefeiwxcbkx.supabase.co/storage/v1/object/public/servics-image/22.jpeg",
  },
  {
    title: "Education Access Program",
    desc: "Providing scholarships, learning materials, and support for quality education access.",
    img: "https://coeahyxujbefeiwxcbkx.supabase.co/storage/v1/object/public/servics-image/4.jpeg",
  },
  {
    title: "Women Rise Initiative",
    desc: "Empowering women through business mentorship, leadership, and financial independence.",
    img: "https://coeahyxujbefeiwxcbkx.supabase.co/storage/v1/object/public/servics-image/30.jpeg",
  },
  {
    title: "Clean Water & Sanitation",
    desc: "Delivering sustainable clean water and sanitation systems to underserved communities.",
    img: "https://coeahyxujbefeiwxcbkx.supabase.co/storage/v1/object/public/servics-image/1.jpeg",
  },
  {
    title: "Green Futures Initiative",
    desc: "Driving environmental sustainability through tree planting and climate awareness.",
    img: "https://coeahyxujbefeiwxcbkx.supabase.co/storage/v1/object/public/servics-image/2.jpeg",
  },
];

export default function Recent() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  /* ---------------- AUTO SLIDE ---------------- */

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.4,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [visible, active]);

  /* ---------------- SLIDER ---------------- */

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setActive((prev) =>
      prev === 0 ? services.length - 1 : prev - 1
    );
  };

  return (
   <section
      ref={sectionRef}
      id="recent"
      className="relative py-20 overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* Soft glow accents */}
      <div
        className="absolute top-0 left-0 w-96 h-96 blur-3xl opacity-20 rounded-full"
        style={{ background: "var(--color-primary-light)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 blur-3xl opacity-10 rounded-full"
        style={{ background: "var(--color-primary)" }}
      />
      {/* HEADER */}
      <div className="px-6 md:px-16 mb-14 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          

          <h2
            // className="text-3xl md:text-5xl font-extrabold leading-tight"
            className="text-3xl md:text-5xl font-extrabold leading-tight mb-8"

            style={{ color: "var(--color-dark)" }}
          >
            OUR 
            {" "}
            <span style={{ color: "var(--color-primary)" }}>
              IMPACT
            </span>
          </h2>
           <p
            className="text-lg leading-relaxed mb-6 font-medium"
            style={{ color: "var(--foreground)" }}
          >
    
  YOULIBUS bridges the gender gap in entrepreneurship by empowering women in business, providing over ₦10M+ in support to young women across various industries to strengthen their businesses and improve their livelihoods.
          </p>

             </motion.div>
      </div>
      {/* ---------------- PARALLAX SLIDER ---------------- */}

      <div className="relative h-[80vh] w-full overflow-hidden">
        {services.map((service, index) => {
          const isActive = index === active;

          return (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? 200 : -200,
              }}
              animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : index % 2 === 0 ? -200 : 200,
                scale: isActive ? 1 : 1.08,
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
              className={`absolute inset-0 ${
                isActive ? "z-20" : "z-10"
              }`}
            >
              {/* IMAGE */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: isActive ? 1.08 : 1,
                  }}
                  transition={{
                    duration: 8,
                    ease: "linear",
                  }}
                />
              </div>

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-black/45" />

              {/* CONTENT */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 z-30">
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 60,
                  }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                  }}
                  className="max-w-3xl"
                >
                  <h3 className="text-white text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                    {service.title}
                  </h3>

                  <p className="text-white/90 text-lg md:text-xl leading-relaxed font-semibold max-w-2xl">
                    {service.desc}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          );
        })}

        {/* ---------------- NAVIGATION ---------------- */}

        <div className="absolute bottom-8 right-8 z-50 flex gap-4">
          <button
            onClick={prevSlide}
            className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-primary transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
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
            onClick={nextSlide}
            className="w-14 h-14 rounded-full bg-primary backdrop-blur-md flex items-center justify-center hover:scale-105 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
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

        {/* ---------------- INDICATORS ---------------- */}

        <div className="absolute bottom-10 left-10 z-50 flex gap-3">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`transition-all duration-300 rounded-full ${
                active === i
                  ? "w-12 h-3 bg-primary"
                  : "w-3 h-3 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}