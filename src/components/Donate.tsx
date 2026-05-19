// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { useState, useEffect } from "react";

// interface DonateModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// interface PaystackTransaction {
//   reference: string;
//   status?: string;
//   message?: string;
//   trans?: string;
//   transaction?: string;
//   trxref?: string;
// }

// export default function DonateModal({ isOpen, onClose }: DonateModalProps) {
//   const publicKey = "pk_test_1b6036b48d8f43c2a04b5c65b2bb23b8792a5b28"; // 🔑 replace with your Paystack public key
//   const [PaystackPop, setPaystackPop] = useState<any>(null);
//   const [donorName, setDonorName] = useState("");
//   const [email, setEmail] = useState("");
//   const [amount, setAmount] = useState<number>(5000);

//   // ✅ Load Paystack only on client (browser)
//   useEffect(() => {
//     (async () => {
//       if (typeof window !== "undefined") {
//         const module = await import("@paystack/inline-js");
//         setPaystackPop(() => module.default);
//       }
//     })();
//   }, []);

//   const handlePay = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!PaystackPop) {
//       alert("Payment system still loading. Please wait a moment...");
//       return;
//     }

//     if (!email) {
//       alert("Please enter your email before proceeding.");
//       return;
//     }

//     if (!amount || amount < 100) {
//       alert("Please enter a valid donation amount (minimum ₦100).");
//       return;
//     }

//     const paystack = new PaystackPop();

//     paystack.newTransaction({
//       key: publicKey,
//       email,
//       amount: amount * 100, // convert ₦ to kobo
//       metadata: {
//         custom_fields: [
//           {
//             display_name: "Donor Name",
//             variable_name: "donor_name",
//             value: donorName || "Anonymous",
//           },
//           {
//             display_name: "Project",
//             variable_name: "project",
//             value: "Feed 100 Project",
//           },
//         ],
//       },
//       onSuccess: (transaction: PaystackTransaction) => {
//         alert(
//           `🎉 Thank you for your donation! Transaction Ref: ${transaction.reference}`
//         );
//         onClose();
//       },
//       onCancel: () => {
//         alert("Payment window closed.");
//       },
//     });
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Background Overlay */}
//           <motion.div
//             className="fixed inset-0 bg-black bg-opacity-70 z-40"
//             onClick={onClose}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.8 }}
//             exit={{ opacity: 0 }}
//           />

//           {/* Main Modal */}
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center px-4"
//             initial={{ opacity: 0, scale: 0.9, y: 30 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 30 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row w-full max-w-4xl">
//               {/* Left (Image) */}
//               <div className="md:w-7/12 w-full relative h-80 md:h-auto bg-[#f8fafc]">
//                 <Image
//                   src="/images/eh.jpg"
//                   alt="Feed 100 Project"
//                   fill
//                   className="object-center"
//                   sizes="(max-width: 768px) 100vw, 50vw"
//                 />
//               </div>

//               {/* Right (Form) */}
//               <div className="md:w-5/12 w-full p-6 flex flex-col justify-center space-y-4">
//                 <h2 className="text-2xl font-bold text-[#02025f]">
//                   Feed 100 Project
//                 </h2>
//                 <p className="text-gray-600 text-sm leading-relaxed">
//                   Join us in ending hunger — one meal at a time. Every donation
//                   helps feed displaced families and bring hope.
//                 </p>

//                 <form onSubmit={handlePay} className="flex flex-col gap-4 mt-4">
//                   <input
//                     type="text"
//                     placeholder="Your Name"
//                     value={donorName}
//                     onChange={(e) => setDonorName(e.target.value)}
//                     className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#02025f]"
//                   />
//                   <input
//                     type="email"
//                     placeholder="Your Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#02025f]"
//                     required
//                   />
//                   <input
//                     type="number"
//                     placeholder="Donation Amount (₦)"
//                     value={amount}
//                     min={100}
//                     onChange={(e) => setAmount(Number(e.target.value))}
//                     className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#02025f]"
//                     required
//                   />

//                   <button
//                     type="submit"
//                     disabled={!PaystackPop}
//                     className={`hover:cursor-pointer rounded-lg px-6 py-3 font-semibold w-full ${
//                       PaystackPop
//                         ? "bg-[#02025f] text-white hover:bg-[#030389]"
//                         : "bg-gray-400 text-white cursor-not-allowed"
//                     }`}
//                   >
//                     {PaystackPop
//                       ? `Donate ₦${amount.toLocaleString()}`
//                       : "Loading..."}
//                   </button>
//                 </form>

//                 <button
//                   onClick={onClose}
//                   className="text-sm hover:cursor-pointer text-gray-500 hover:text-gray-700 mt-3"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }
