// CoverPage.jsx
import ScrollIcon from "./ScrollIcon";
import { motion } from "framer-motion";

export default function CoverPage() {
  return (
    <div className="h-screen w-full relative bg-beige flex flex-col justify-center items-center">
      <img
        src="/assets/images/cafe-placeholder2.jpeg"
        alt="Cafe Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <motion.h1
        className="text-6xl font-cafe text-black z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        Sabrina W
      </motion.h1>
      <motion.p
        className="absolute bottom-4 left-4 text-sm text-gray-700 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        Software Engineer & Developer
      </motion.p>
      <ScrollIcon />
    </div>
  );
}
