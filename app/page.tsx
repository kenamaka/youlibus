"use client";

import { useState } from "react";
import AboutSection from "@/src/components/home/About";
import Hero from "@/src/components/home/Hero";
import Footer from "@/src/components/home/Footer";
import Nav from "@/src/components/home/Nav";
import Recent from "@/src/components/home/Services";
import UpcomingProject from "@/src/components/home/Upcoming";
import Contact from "@/src/components/home/Contact";
// import DonateModal from "@/src/components/Donate";

export default function Home() {
  const [showDonate, setShowDonate] = useState(false);

  const openDonate = () => setShowDonate(true);
  const closeDonate = () => setShowDonate(false);

  return (
    <div className="overflow-x-hidden">
      <Nav onDonateClick={openDonate} />
      <Hero />
      <AboutSection />
      {/* <UpcomingProject onDonateClick={openDonate} /> */}
      <Recent />
      <UpcomingProject />

      {/* <Contact /> */}
      <Footer/>
      

      {/* <DonateModal isOpen={showDonate} onClose={closeDonate} /> */}
    </div>
  );
}
