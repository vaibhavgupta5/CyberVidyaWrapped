import { motion } from "framer-motion";

export default function StoryProgress({ count, activeIndex, duration = 5000 }) {
  return (
    <div className="absolute top-4 left-0 w-full px-4 flex gap-1 z-50">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-1 flex-1 bg-zinc-300  -full overflow-hidden">
          <motion.div
            className="h-full bg-black  -full"
            initial={{ width: i < activeIndex ? "100%" : "0%" }}
            animate={{
              width:
                i < activeIndex ? "100%" : i === activeIndex ? "100%" : "0%",
            }}
            transition={{
              duration: i === activeIndex ? duration / 1000 : 0,
              ease: "linear",
            }}
          />
        </div>
      ))}
    </div>
  );
}
