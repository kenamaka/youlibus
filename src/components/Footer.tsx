"use client";
import React from "react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineYoutube,
} from "react-icons/ai";
import { SiTiktok } from "react-icons/si";
import { Link } from 'react-scroll'
import {motion} from "framer-motion"
const Footer = () => {
  const year = new Date().getFullYear();

  const footerNavItems = [
    { name: "Home", to: "hero" },
    { name: "About", to: "about" },
    { name: "Next Mission", to: "next" },
    { name: "Projects", to: "recent" },
    // { name: "Volunteer", to: "volunteer" },
    // { name: "Donate", to: "donate" },
  ];

  return (
    <footer className="bg-[#02025f] text-white">
      <div className="max-w-screen-xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 pb-10  ">
          {/* About / Logo Area */}
          <div className="space-y-4">
            <img
              alt="logo"
              src="/images/icon.png"
              className="w-16 h-auto object-contain invert grayscale-100"
            />

            {/* <h3 className="text-2xl font-bold mb-4">AESTI</h3> */}
            <p className=" text-sm leading-relaxed text-white/80 max-w-sm">
              Empowering individuals and communities to build sustainable
              livelihoods, achieve self-reliance, and shape a brighter future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {footerNavItems.map(({ name, to }) => (
                <li key={
                  name
                }>
                  <Link
                    to={to}
                    smooth 
                    offset={-50}
                    duration = {500}
                    className="hover:text-gray-200 hover:cursor-pointer transition-colors"
                  >
                    {name}
                  </Link>
                </li>
              ))}

            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
              >
                <AiOutlineFacebook size={20} />
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
              >
                <AiOutlineInstagram size={20} />
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
              >
                <AiOutlineTwitter size={20} />
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
              >
                <AiOutlineYoutube size={20} />
              </Link>
              <Link
                href="#"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
              >
                <SiTiktok size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-white/70">
          <p>© {year} AESTI. All rights reserved.</p>

          <div className="flex gap-6 mt-3 sm:mt-0">
            <Link href="#" className="hover:text-white">
              Terms
            </Link>
            <Link href="#" className="hover:text-white">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
