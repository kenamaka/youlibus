"use client";

import { motion } from "framer-motion";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";

const events = [
  {
    id: 1,
    title: "Feed 100 Project",
    date: "August 24, 2026",
    location: "Abuja, Nigeria",
    image: "https://coeahyxujbefeiwxcbkx.supabase.co/storage/v1/object/public/servics-image/29.jpeg",
    description:
      "Providing meals and support packages to displaced families and vulnerable individuals.",
    latest: true,
  },
  {
    id: 2,
    title: "Community Food Drive",
    date: "July 12, 2026",
    location: "Lagos, Nigeria",
    image: "https://coeahyxujbefeiwxcbkx.supabase.co/storage/v1/object/public/servics-image/13.jpeg",
    description:
      "Partnering with local communities to distribute food supplies and essentials.",
  },
  {
    id: 3,
    title: "Youth Empowerment Summit",
    date: "June 02, 2026",
    location: "Kano, Nigeria",
    image: "https://coeahyxujbefeiwxcbkx.supabase.co/storage/v1/object/public/servics-image/15.jpeg",
    description:
      "Helping young people access mentorship, leadership, and career opportunities.",
  },
  {
    id: 4,
    title: "Youth Empowerment Summit",
    date: "June 02, 2026",
    location: "Kano, Nigeria",
    image: "https://coeahyxujbefeiwxcbkx.supabase.co/storage/v1/object/public/servics-image/2.jpeg",
    description:
      "Helping young people access mentorship, leadership, and career opportunities.",
  },
];

export default function EventsSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* Background Glow */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-40"
        style={{ background: "var(--color-secondary)" }}
      />

      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-40"
        style={{ background: "var(--color-primary-light)" }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl px-6 md:px-12 mb-16"
        >
          <span
            className="inline-flex px-4 py-1 rounded-full text-sm font-semibold mb-5"
            style={{
              background: "var(--color-secondary-light)",
              color: "var(--color-primary)",
            }}
          >
            Events & Outreach
          </span>

          <h2
            className="text-4xl md:text-6xl font-bold leading-tight"
            style={{
              color: "var(--color-dark)",
              fontFamily: "var(--font-modern)",
            }}
          >
            Creating Impact Through
            <span
              className="block"
              style={{ color: "var(--foreground)" }}
            >
              Community Events
            </span>
          </h2>

          <p
            className="mt-6 text-lg leading-relaxed"
            style={{ color: "var(--color-muted)" }}
          >
            Explore our latest and past outreach events making meaningful
            impact across communities.
          </p>
        </motion.div>

        {/* Modern Slider */}
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
                  {/* Image */}
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(91,11,53,0.88), rgba(91,11,53,0.2), transparent)",
                    }}
                  />

                  {/* Latest Badge */}
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

                  {/* Content */}
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
                        <CalendarDays size={16} />
                        {event.date}
                      </div>

                      <div
                        className="flex items-center gap-2 backdrop-blur-md px-3 py-2 rounded-full text-sm"
                        style={{
                          background: "rgba(255,255,255,0.14)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      >
                        <MapPin size={16} />
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

                    {/* Register Button */}
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
                      Register Event
                      <ArrowRight size={18} />
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