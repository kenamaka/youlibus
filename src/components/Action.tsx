"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const Action = () => {
  return (
    <section
      id="hero"
      className="relative w-full md:h-[70vh] h-[40vh] overflow-hidden flex my-20 flex-col md:flex-row items-center justify-center"
    >
      {/* 🖼️ Parallax Background Image */}
      <motion.div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/eh.jpg"
            alt="Action Background"
            fill
            className="object-cover "
            priority
          />
        </div>
      </motion.div>

      {/* 🕶️ Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* ✨ Foreground Content */}
      <section className="flex items-center justify-center z-20">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          {/* <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Main Heading
          </h1>
          <p className="text-lg md:text-xl mb-6">
            A short catchy description or call to action.
          </p> */}

          <div className="flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md text-white font-medium">
              Action One
            </button>
            <button className="bg-white hover:bg-gray-200 text-black px-6 py-3 rounded-md font-medium">
              Action Two
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Action;
