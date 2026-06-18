"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";

const TARGET_DATE = new Date("2026-06-20T23:59:00");

export default function VotingCountdown() {
const [timeLeft, setTimeLeft] = useState({
days: 0,
hours: 0,
minutes: 0,
seconds: 0,
});

useEffect(() => {
const calculateTime = () => {
const now = new Date();
const difference =
TARGET_DATE.getTime() - now.getTime();

  if (difference <= 0) {
    window.location.reload();
    return;
  }

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (difference %
      (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (difference %
      (1000 * 60 * 60)) /
      (1000 * 60)
  );

  const seconds = Math.floor(
    (difference %
      (1000 * 60)) /
      1000
  );

  setTimeLeft({
    days,
    hours,
    minutes,
    seconds,
  });
};

calculateTime();

const interval = setInterval(
  calculateTime,
  1000
);

return () => clearInterval(interval);

}, []);

const countdownItems = [
{
label: "Days",
value: timeLeft.days,
},
{
label: "Hours",
value: timeLeft.hours,
},
{
label: "Minutes",
value: timeLeft.minutes,
},
{
label: "Seconds",
value: timeLeft.seconds,
},
];

return ( <main className="relative flex min-h-screen overflow-hidden bg-[#18181B]">
{/* Background */} <div className="absolute inset-0"> <Image
       src="https://coeahyxujbefeiwxcbkx.supabase.co/storage/v1/object/public/servics-image/25.jpeg"
       alt="Voting Countdown"
       fill
       priority
       className="object-cover"
     />

```
    <div className="absolute inset-0 bg-black/70" />

    <div className="absolute inset-0 bg-gradient-to-b from-[#4C1D95]/30 via-black/40 to-black" />

    <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-[#6D28D9]/30 blur-3xl" />

    <div className="absolute bottom-[-120px] right-[-120px] h-[300px] w-[300px] rounded-full bg-[#4C1D95]/40 blur-3xl" />
  </div>

  {/* Content */}
  <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 py-12">
    {/* Badge */}
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-3 backdrop-blur-xl"
    >
      <div className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />

      <p className="text-sm font-medium tracking-wide text-[#E4E4E7]">
        YOULIBUS AWARDS 2026
      </p>
    </motion.div>

    {/* Hero Text */}
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="max-w-4xl text-center"
    >
      <h1 className="text-5xl font-black tracking-tight text-white md:text-7xl lg:text-8xl">
        Voting Opens
        <br />
        Soon.
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#D4D4D8] md:text-lg md:leading-8">
        Voting officially opens on
        <span className="font-semibold text-white">
          {" "}
          20 June 2026 at 11:59 PM
        </span>
        . Get ready to support your favourite
        nominees across all award categories.
      </p>
    </motion.div>

    {/* Countdown */}
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.2,
      }}
      className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4"
    >
      {countdownItems.map((item) => (
        <div
          key={item.label}
          className="w-[140px] rounded-[32px] border border-white/10 bg-white/10 p-6 text-center backdrop-blur-2xl"
        >
          <h2 className="text-4xl font-black text-white md:text-5xl">
            {String(item.value).padStart(
              2,
              "0"
            )}
          </h2>

          <p className="mt-2 text-sm uppercase tracking-widest text-[#A1A1AA]">
            {item.label}
          </p>
        </div>
      ))}
    </motion.div>

    {/* Bottom Card */}
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.3,
      }}
      className="mt-12 w-full max-w-lg rounded-[32px] border border-white/10 bg-white/10 p-6 backdrop-blur-2xl"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#4C1D95] via-[#5B21B6] to-[#6D28D9]">
          <Clock3 size={22} />
        </div>

        <div>
          <h3 className="font-semibold text-white">
            Voting Countdown
          </h3>

          <p className="text-sm text-[#A1A1AA]">
            The portal will automatically
            become available once voting
            begins.
          </p>
        </div>
      </div>

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear",
          }}
          className="h-full w-1/3 rounded-full bg-gradient-to-r from-[#4C1D95] via-[#5B21B6] to-[#A855F7]"
        />
      </div>
    </motion.div>
  </div>
</main>

);
}
