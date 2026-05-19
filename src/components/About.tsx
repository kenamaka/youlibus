"use client";

import Image from "next/image";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
      <section className="pt-20 px-4 md:px-12" id = "about">

      <div className="container  flex flex-col lg:flex-row gap-10">
        {/* IMAGE MOSAIC */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-6/12 grid grid-cols-2 gap-2"
        >
          {/* Left tall image */}
          <div className="relative row-span-2 h-[400px] sm:h-[500px] lg:h-[600px]">
            <Image
              src="/images/11.jpg"
              alt="Main portrait"
              fill
              className="object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Top-right image */}
          <div className="relative h-[200px] sm:h-[240px] lg:h-[295px]">
            <Image
              src="/images/10.jpg"
              alt="Secondary portrait 1"
              fill
              className="object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Bottom-right image */}
          <div className="relative h-[200px] sm:h-[240px] lg:h-[295px]">
            <Image
              src="/images/13.jpg"
              alt="Secondary portrait 2"
              fill
              className="object-cover rounded-lg shadow-md"
            />
          </div>
        </motion.div>

        {/* CONTENT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-6/12 flex flex-col justify-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#02025f] mb-4">
            About Us
          </h2>

          <p className="text-gray-700 mb-4">
            We are "Allies Entrepreneurial Skill Training Initiative". We
            empower vulnerable individuals and displaced communities with
            skills, education, and hope. From rural villages to urban centers,
            AESTI brings opportunity where it’s needed most.
          </p>
          <p className="text-gray-700 mb-6">
            Through entrepreneurship, education, and compassion, we uplift the
            underprivileged and promote self-reliance across communities.
          </p>

          <div className="grid grid-cols-2 gap-6 text-center md:text-left mt-4">
            <div>
              <h6 className="text-2xl font-bold text-[#02025f]">
                100M<span className="text-[#fa9931]">+</span>
              </h6>
              <p className="text-sm text-gray-600">Lives Impacted</p>
            </div>
            <div>
              <h6 className="text-2xl font-bold text-[#02025f]">
                50K<span className="text-[#fa9931]">+</span>
              </h6>
              <p className="text-sm text-gray-600">Skills Trained</p>
            </div>
            <div>
              <h6 className="text-2xl font-bold text-[#02025f]">
                1.3M<span className="text-[#fa9931]">+</span>
              </h6>
              <p className="text-sm text-gray-600">Community Networks</p>
            </div>
            <div>
              <h6 className="text-2xl font-bold text-[#02025f]">
                153K<span className="text-[#fa9931]">+</span>
              </h6>
              <p className="text-sm text-gray-600">Volunteers & Partners</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
