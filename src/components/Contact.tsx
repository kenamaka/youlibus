"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // You can later connect this to Formspree, Supabase, or an API route
  };

  return (
    <section id = "contact" className="relative w-full bg-[#f8fafc] py-20 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Left: Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-[#02025f] mb-4">Contact Us</h2>
          <p className="text-lg text-gray-700 mb-8">
            Have questions, suggestions, or want to get involved? Reach out —
            we’d love to hear from you.
          </p>

          <div className="space-y-6 text-gray-700">
            <div className="flex items-center gap-4">
              <div className="bg-[#02025f]/10 p-3 rounded-full">
                <FiMapPin size={22} className="text-[#02025f]" />
              </div>

              <p>Sp 41, Apo resettlement, Abuja, Nigeria.</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-[#02025f]/10 p-3 rounded-full">
                <FiMail size={22} className="text-[#02025f]" />
              </div>
              <p>aestiinfo@gmail.com</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-[#02025f]/10 p-3 rounded-full">
                <FiPhone size={22} className="text-[#02025f]" />
              </div>
              <p>+234 904 921 9210</p>
            </div>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.form
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02025f]"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02025f]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02025f]"
              placeholder="Write your message here..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#02025f] text-white font-semibold py-3 rounded-xl hover:bg-[#030389] transition"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
}



// "use client";

// import { motion } from "framer-motion";
// import { useState } from "react";
// import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";

// export default function ContactSection() {
//   const [form, setForm] = useState({ name: "", email: "", message: "" });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Form submitted:", form);
//     // Later: connect this to Formspree, Supabase, or a backend route
//   };

//   return (
//     <section className="relative w-full py-24 px-6 lg:px-16 overflow-hidden">
//       {/* Background Image */}
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage: "url('/images/11.jpg')", // ← Replace with your preferred image
//         }}
//       ></div>

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-[#02025f]/80 backdrop-blur-[2px]"></div>

//       {/* Content */}
//       <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start text-white">
//         {/* Left: Info */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
//           <p className="text-lg text-gray-100 mb-8">
//             Whether you want to partner, volunteer, or just say hello — we’re
//             always ready to connect and collaborate for impact.
//           </p>

//           <div className="space-y-6 text-gray-100">
//             <div className="flex items-center gap-4">
//               <div className="bg-white/10 p-3 rounded-full">
//                 <FiMapPin size={22} className="text-white" />
//               </div>
//               <p>123 Impact Street, Lagos, Nigeria</p>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="bg-white/10 p-3 rounded-full">
//                 <FiMail size={22} className="text-white" />
//               </div>
//               <p>info@aesti.org</p>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="bg-white/10 p-3 rounded-full">
//                 <FiPhone size={22} className="text-white" />
//               </div>
//               <p>+234 812 345 6789</p>
//             </div>
//           </div>
//         </motion.div>

//         {/* Right: Form */}
//         <motion.form
//           initial={{ opacity: 0, x: 50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//           onSubmit={handleSubmit}
//           className="bg-white/95 text-gray-800 shadow-2xl rounded-2xl p-8 space-y-5 backdrop-blur-sm"
//         >
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               required
//               className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02025f]"
//               placeholder="Your full name"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               required
//               className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02025f]"
//               placeholder="you@example.com"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Message
//             </label>
//             <textarea
//               name="message"
//               value={form.message}
//               onChange={handleChange}
//               required
//               rows={4}
//               className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02025f]"
//               placeholder="Write your message here..."
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#02025f] text-white font-semibold py-3 rounded-xl hover:bg-[#030389] transition"
//           >
//             Send Message
//           </button>
//         </motion.form>
//       </div>
//     </section>
//   );
// }
