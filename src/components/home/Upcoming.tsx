"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaRegCalendarAlt, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

const events = [
  {
    id: 1,
    title: "YOULIBUS International conference and Awards",
    date: "May 15, 2026",
    location: "Abuja, Nigeria",
    image:
      "https://coeahyxujbefeiwxcbkx.supabase.co/storage/v1/object/public/servics-image/29.jpeg",
    description:
      "With a focus on bridging the gender gap in entrepreneurship.",
    latest: true,
  },
  {
    id: 2,
    title: "International women’s day webinar",
    date: "May 12, 2026",
    location: "Lagos, Nigeria",
    image:
      "https://coeahyxujbefeiwxcbkx.supabase.co/storage/v1/object/public/servics-image/13.jpeg",
    description:
      "Partnering with local communities to distribute food supplies and essentials.",
  },
  {
    id: 3,
    title: "YOULIBUS Purple Brunch",
    date: "October 18, 2026",
    location: "Kano, Nigeria",
    image:
      "https://coeahyxujbefeiwxcbkx.supabase.co/storage/v1/object/public/servics-image/15.jpeg",
    description:
      "Helping young people access mentorship, leadership, and career opportunities.",
  },
  {
    id: 4,
    title: "Youth Empowerment Summit",
    date: "June 02, 2026",
    location: "Kano, Nigeria",
    image:
      "https://coeahyxujbefeiwxcbkx.supabase.co/storage/v1/object/public/servics-image/2.jpeg",
    description:
      "Helping young people access mentorship, leadership, and career opportunities.",
  },
];

export default function EventsSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-40"
        style={{ background: "var(--color-secondary)" }}
      />

      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-40"
        style={{ background: "var(--color-primary-light)" }}
      />

      <div className="relative max-w-7xl mx-auto">
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
            UPCOMING 
            {" "}
            <span style={{ color: "var(--color-primary)" }}>
              EVENTS
            </span>
          </h2>
           {/* <p
            className="text-lg leading-relaxed mb-6 font-medium"
            style={{ color: "var(--foreground)" }}
          >
    
  YOULIBUS bridges the gender gap in entrepreneurship by empowering women in business, providing over ₦10M+ in support to young women across various industries to strengthen their businesses and improve their livelihoods.
          </p> */}

             </motion.div>
      </div>

        {/* Slider */}
        <div className="relative">
          <div
            className="
              flex items-center gap-6
              overflow-x-auto
              px-6 md:px-16
              py-8
              snap-x snap-mandatory
              scrollbar-hide
              scroll-smooth
            "
          >
            {events.map((event, index) => {
              const isActive = index === active;

              return (
                <motion.div
                  key={event.id}
                  onClick={() => setActive(index)}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative flex-shrink-0 snap-center
                    transition-all duration-500 ease-out
                    cursor-pointer rounded-[32px]
                    overflow-hidden group
                    shadow-xl
                    ${
                      isActive
                        ? "w-[85vw] md:w-[720px] h-[540px] scale-100 z-20"
                        : "w-[280px] md:w-[340px] h-[440px] scale-90 opacity-70"
                    }
                  `}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(91,11,53,0.88), rgba(91,11,53,0.2), transparent)",
                    }}
                  />

                  {event.latest && (
                    <div
                      className="absolute top-6 left-6 backdrop-blur-md text-xs font-bold px-4 py-2 rounded-full shadow-lg"
                      style={{
                        background: "rgba(255,255,255,0.9)",
                        color: "var(--color-primary)",
                      }}
                    >
                      Latest Event
                    </div>
                  )}

                  <div className="absolute bottom-0 p-8 text-white w-full">
                    {/* Meta */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div
                        className="flex items-center gap-2 backdrop-blur-md px-3 py-2 rounded-full text-sm"
                        style={{
                          background: "rgba(255,255,255,0.14)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      >
                        <FaRegCalendarAlt size={16} />
                        {event.date}
                      </div>

                      <div
                        className="flex items-center gap-2 backdrop-blur-md px-3 py-2 rounded-full text-sm"
                        style={{
                          background: "rgba(255,255,255,0.14)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      >
                        <FaMapMarkerAlt size={16} />
                        {event.location}
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-3xl md:text-4xl font-bold leading-tight"
                      style={{ fontFamily: "var(--font-modern)" }}
                    >
                      {event.title}
                    </h3>

                    {/* Description */}
                    <motion.p
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        height: isActive ? "auto" : 0,
                        marginTop: isActive ? 16 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                      className="leading-relaxed overflow-hidden"
                      style={{ color: "rgba(255,255,255,0.82)" }}
                    >
                      {event.description}
                    </motion.p>

                    {/* Button */}
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : 20,
                      }}
                      transition={{ duration: 0.4 }}
                      className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-lg"
                      style={{
                        background: "var(--color-primary)",
                        color: "var(--color-white)",
                      }}
                    >
                      Register Now
                      <FaArrowRight size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}