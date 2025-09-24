// Section.jsx
import { motion } from "framer-motion";

export default function Section({ id, children, bgColor }) {
  return (
    <section
      id={id}
      className={`h-screen w-full flex justify-center items-center ${bgColor}`}
    >
      <motion.div
        className="w-4/5"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
