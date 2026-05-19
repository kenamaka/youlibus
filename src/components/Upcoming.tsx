// components/UpcomingProject.tsx
"use client";

import { joinGroup } from "@/lib/joinGroup";
import { motion } from "framer-motion";

export default function UpcomingProject({onDonateClick}:{onDonateClick: () => void}) {
  return (
    <section id="next" className="pt-20 px-4 md:px-12 relative g-[#f8fafc]   ">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Left Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center lg:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#02025f] mb-4">
            Upcoming Project: Ending Hunger — Feed 100 Project
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            A community outreach initiative to feed one hundred displaced
            people, sharing love, hope, and nourishment with those in need.
            Together, we believe that no one should go hungry.
          </p>

          <div className="flex justify-center lg:justify-start gap-4">
            <motion.button
              onClick={onDonateClick}
              className="border hover:cursor-pointer border-[#0c0c2c] text-[#02025f] hover:bg-[#02025f] hover:text-white rounded-full px-6 py-3"
            >
              Donate
            </motion.button>
            <motion.button
            onClick={joinGroup}
              className="bg-[#02025f] hover:cursor-pointer text-white hover:bg-[#030389] rounded-full px-6 py-3">
              Volunteer
            </motion.button>
          </div>
        </motion.div>

        {/* Right Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <img
            src="/images/eh1.jpg"
            alt="Clean Water Initiative"
            className="w-full h-[500px] object rounded-2xl shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}
