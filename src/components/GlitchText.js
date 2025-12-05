import { motion } from "framer-motion";

export default function GlitchText({
  text,
  isGlitchy = false,
  className = "",
}) {
  if (!isGlitchy) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={`inline-block ${className}`}
      animate={{
        x: [0, -2, 2, -1, 1, 0],
        opacity: [1, 0.8, 1, 0.9, 1],
      }}
      transition={{
        duration: 0.4,
        repeat: Infinity,
        repeatDelay: 2, // Glitch every 2 seconds
        ease: "linear",
      }}
    >
      {text}
    </motion.span>
  );
}
