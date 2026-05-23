"use client";

import { motion, Variants } from "framer-motion";
import {
  FaUtensils,
  FaHandsHelping,
  FaGraduationCap,
  FaHeartbeat,
  FaUsers,
  FaChartLine,
  FaRocket,
  FaTrophy,
} from "react-icons/fa";

const focusAreas = [
  {
   id: 1,
title: "Leadership Development & Mentorship Programs",
description:
  "We empower young women in business through mentorship, skills training, executive coaching, personality development, and leadership summits, connecting them with experienced professionals who guide their career growth and help them access leadership opportunities.",
image: "https://coeahyxujbefeiwxcbkx.supabase.co/storage/v1/object/public/servics-image/28.jpeg",
icon: FaGraduationCap,
  },
  {
    id: 2,
title: "Advocacy & Growth Path",
description:
  "YOULIBUS advocates for women’s rights in policy spaces by engaging governments, NGOs, and international organizations. We promote gender equality, address gender-based violence, and support access to grants and opportunities for women-owned businesses while removing systemic barriers to leadership and growth.",
image: "https://coeahyxujbefeiwxcbkx.supabase.co/storage/v1/object/public/servics-image/60.jpeg",
icon: FaChartLine
  },
  {
    id: 3,
title: "Entrepreneurship & Economic Empowerment",
description:
  "We provide young entrepreneurs with access to capital, networks, and educational programs to scale their businesses. YOULIBUS promotes gender-inclusive entrepreneurship and works with key stakeholders to bridge the gender gap, empowering women with the tools and visibility to grow and succeed in business.",
image: "https://coeahyxujbefeiwxcbkx.supabase.co/storage/v1/object/public/servics-image/47.jpeg",
icon: FaRocket,
  },
  {id: 4,
title: "Networking & Partnerships",
description:
  "YOULIBUS creates platforms and curates networking events where women from diverse industries can connect, share resources, and build lasting partnerships that accelerate personal and professional growth. Our network spans across borders, bringing together women leaders and changemakers across Africa.",
image: "https://coeahyxujbefeiwxcbkx.supabase.co/storage/v1/object/public/servics-image/64.jpeg",
icon: FaHandsHelping,
  },
  {
    id: 5,
title: "Awards & Recognition",
description:
  "YOULIBUS celebrates the achievements of women across various sectors through annual awards recognizing excellence in leadership, innovation, and social impact. These awards honor individual accomplishments and inspire the next generation of women leaders.",
    image: "https://coeahyxujbefeiwxcbkx.supabase.co/storage/v1/object/public/servics-image/42.jpeg",

    icon: FaTrophy,
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function KeyFocusAreas() {
  return (
    <section className="relative py-28 overflow-hidden bg-transparent">
      {/* soft background glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-transparent blur-3xl opacity-30 rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96  blur-3xl opacity-30 rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
       
        {/* GRID */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {focusAreas.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                variants={card}
                whileHover={{ y: -10 }}
                className="relative group overflow-hidden rounded-[28px] shadow-xl cursor-pointer"
              >
                {/* IMAGE */}
                <div className="relative h-[380px] w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transform group-hover:scale-110 transition duration-700"
                  />

                  {/* gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>

                {/* CONTENT */}
                <div className="absolute bottom-0 p-6 text-white">
                  {/* icon badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-full">
                      <Icon size={18} />
                    </div>

                    <span className="text-sm font-medium opacity-90">
                      Focus Area
                    </span>
                  </div>

                  {/* title */}
                  <h3 className="text-2xl font-bold leading-snug">
                    {item.title}
                  </h3>

                  {/* description */}
                  <p className="text-sm text-white/80 mt-2 ">
                    {item.description}
                  </p>

                  {/* hover underline */}
                  <motion.div
                    className="h-[2px] mt-4 w-0 group-hover:w-full transition-all duration-500"
                        style={{
              background: "var(--color-primary)",
            }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}