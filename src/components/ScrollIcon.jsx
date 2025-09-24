// ScrollIcon.jsx
import { motion } from "framer-motion";

export default function ScrollIcon() {
  return (
    <motion.div
      className="absolute bottom-8"
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 1 }}
    >
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 5v14M19 12l-7 7-7-7" />
      </svg>
    </motion.div>
  );
}
