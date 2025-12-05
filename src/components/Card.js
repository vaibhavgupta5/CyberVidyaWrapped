import { motion } from "framer-motion";

export default function Card({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`notebook-card relative flex items-center justify-center overflow-hidden p-4 ${className}`}
    >
      {children}
    </motion.div>
  );
}
