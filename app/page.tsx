"use client";

import { useState } from "react";
import AboutSection from "@/src/components/About";
import Hero from "@/src/components/Hero";
import Footer from "@/src/components/Footer";
import Nav from "@/src/components/Nav";
import Recent from "@/src/components/Services";
import UpcomingProject from "@/src/components/Upcoming";
import Contact from "@/src/components/Contact";
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
      <UpcomingProject onDonateClick={openDonate} />
      <Recent />
      <Contact />
      <Footer/>
      

      {/* <DonateModal isOpen={showDonate} onClose={closeDonate} /> */}
    </div>
  );
}
