"use client";

import React from "react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineYoutube,
} from "react-icons/ai";
import { SiTiktok } from "react-icons/si";
import { Link } from "react-scroll";

const Footer = () => {
  const year = new Date().getFullYear();

  const footerNavItems = [
    { name: "Home", to: "hero" },
    { name: "About Us", to: "about" },
    { name: "Our Impact", to: "next" },
    { name: "Upcoming Events", to: "recent" },
    { name: "Who we are", to: "contact" },
  ];

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "var(--color-dark)" }}
    >
      {/* subtle glow */}
      <div
        className="absolute top-0 left-0 w-80 h-80 blur-3xl opacity-20 rounded-full"
        style={{ background: "var(--color-primary)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 blur-3xl opacity-10 rounded-full"
        style={{ background: "var(--color-primary-light)" }}
      />

      <div className="relative max-w-screen-xl mx-auto px-6 py-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 pb-12">

          {/* Logo / About */}
          <div className="space-y-4">
            <p
              className="text-sm leading-relaxed max-w-sm"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
             To foster an inclusive global network of women leaders, innovators, and changemakers who collaborate to amplify women’s voices and drive transformative change. 
            </p>

            {/* ADDRESS */}
            <div className="space-y-2 mt-6">
              <p
                className="text-sm font-semibold"
                style={{ color: "white" }}
              >
                Address
              </p>
              <p style={{ color: "rgba(255,255,255,0.7)" }} className="text-sm">
                WETLAND Mall, Jabi, Abuja, Nigeria
              </p>

              <p
                className="text-sm font-semibold mt-3"
                style={{ color: "white" }}
              >
                Phone
              </p>
              <p style={{ color: "rgba(255,255,255,0.7)" }} className="text-sm">
                08152704785
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-lg font-semibold mb-5"
              style={{ color: "white" }}
            >
              Quick Links
            </h4>

            <ul className="space-y-3 text-sm">
              {footerNavItems.map(({ name, to }) => (
                <li key={name}>
                  <Link
                    to={to}
                    smooth
                    offset={-80}
                    duration={500}
                    className="cursor-pointer transition-colors hover:opacity-80"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-white">
              Connect With Us
            </h4>

            <div className="flex gap-3 flex-wrap">
              {[
                AiOutlineFacebook,
                AiOutlineInstagram,
                AiOutlineTwitter,
                AiOutlineYoutube,
                SiTiktok,
              ].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-3 rounded-full transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "white",
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center text-sm"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <p style={{ color: "rgba(255,255,255,0.6)" }}>
            © {year} YOULIBUS. All rights reserved.
          </p>

          <div className="flex gap-6 mt-3 sm:mt-0">
            <a
              href="#"
              className="hover:opacity-80 transition"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Terms
            </a>
            <a
              href="#"
              className="hover:opacity-80 transition"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;