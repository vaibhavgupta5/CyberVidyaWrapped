import { motion } from "framer-motion";

export default function Stamp({
  text,
  color = "text-emerald-500",
  borderColor = "border-emerald-500",
  rotate = -12,
}) {
  return (
    <motion.div
      initial={{ scale: 2, opacity: 0, rotate: rotate }}
      animate={{ scale: 1, opacity: 1, rotate: rotate }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.5,
      }}
      className={`absolute z-20 border-4 ${borderColor} ${color} px-4 py-2 font-black text-2xl uppercase tracking-widest opacity-80 mix-blend-multiply`}
      style={{
        maskImage: "url('/noise.png')", // Optional: if we had a noise texture for grunge effect
        borderStyle: "double",
      }}
    >
      {text}
    </motion.div>
  );
}
