"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 px-6 md:px-12 bg-white overflow-hidden"
    >
      {/* BACKGROUND BLUR */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-100 rounded-full blur-3xl opacity-40 -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-30 -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        {/* ================= IMAGES ================= */}

        <motion.div
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full lg:w-6/12"
        >
          <div className="grid grid-cols-2 gap-4">
            {/* LARGE IMAGE */}
            <div className="relative row-span-2 h-[420px] sm:h-[520px] rounded-[2rem] overflow-hidden shadow-2xl">
              <Image
                src="/images/1one.jpeg"
                alt="Women empowerment"
                fill
                className="object-cover hover:scale-105 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* TOP IMAGE */}
            <div className="relative h-[200px] sm:h-[250px] rounded-[2rem] overflow-hidden shadow-xl mt-10">
              <Image
                src="/images/2two.jpeg"
                alt="Training session"
                fill
                className="object-cover hover:scale-105 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* BOTTOM IMAGE */}
            <div className="relative h-[200px] sm:h-[250px] rounded-[2rem] overflow-hidden shadow-xl">
              <Image
                src="/images/3three.jpeg"
                alt="Community impact"
                fill
                className="object-cover hover:scale-105 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* ================= CONTENT ================= */}

        <motion.div
          initial={{ opacity: 0, x: 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full lg:w-6/12"
        >
          {/* SMALL LABEL */}
          <p className="uppercase tracking-[0.25em] text-primary font-bold text-sm mb-5">
            About YOULIBUS
          </p>

          {/* HEADING */}
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#5B0B35] leading-tight mb-8">
            Empowering Young Women To
            <span className="gradient-text"> Rise, Lead & Thrive</span>
          </h2>

          {/* TEXT */}
          <p className="text-[#7A1E4D] text-lg leading-relaxed mb-6 font-medium">
            YOULIBUS is a modern empowerment platform dedicated to equipping
            young women with the tools, confidence, education, and opportunities
            needed to succeed in business and leadership.
          </p>

          <p className="text-[#9B6B82] leading-relaxed mb-10 text-base">
            Through mentorship, entrepreneurship programs, digital skill
            training, and community-driven initiatives, we help women build
            sustainable futures while creating lasting social impact across
            communities.
          </p>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-5">
            {[
              {
                number: "100K+",
                label: "Women Empowered",
              },
              {
                number: "50K+",
                label: "Skills Trained",
              },
              {
                number: "1.3M+",
                label: "Community Reach",
              },
              {
                number: "150+",
                label: "Partners & Volunteers",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-[#FFF8FB] border border-[#F3D3E2] rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all"
              >
                <h3 className="text-3xl font-extrabold gradient-text mb-2">
                  {item.number}
                </h3>

                <p className="text-[#7A1E4D] font-semibold text-sm">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}