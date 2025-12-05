import { motion } from "framer-motion";
import Card from "../Card";
import { AlarmClock } from "lucide-react";

export default function TheGreatEscapeSlide({ data }) {
  const totalBunks = data.totalBunks || 0;
  const hoursSaved = data.hoursSaved || 0;
  const days = (hoursSaved / 24).toFixed(2);

  // Create a grid of alarm clocks (max 50 for performance)
  const displayCount = Math.min(totalBunks, 50);

  return (
    <Card className="flex flex-col items-center justify-center text-center h-full overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring" }}
        className="text-3xl font-black text-zinc-800 mb-4 font-permanent-marker transform -rotate-2"
      >
        The Great Escape
      </motion.h2>

      {/* Pile of alarm clocks */}
      <div className="relative w-full h-48 mb-6 overflow-hidden">
        <motion.div
          className="absolute inset-0 flex flex-wrap justify-center items-center gap-1 opacity-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {Array.from({ length: displayCount }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                scale: 0,
                rotate: Math.random() * 360,
              }}
              animate={{
                opacity: 0.4,
                scale: 1,
                rotate: Math.random() * 360,
              }}
              transition={{
                delay: i * 0.02,
                duration: 0.3,
              }}
            >
              <AlarmClock
                size={24}
                className="text-zinc-400"
                style={{
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Big number overlay */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="bg-white/95 border-5 border-r-8 border-b-8   border-black px-8 py-6 transform rotate-3  -2xl">
            <div className="text-7xl font-black text-black font-mono">
              {totalBunks}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="space-y-2"
      >
        <p className="text-xl font-bold text-zinc-800">
          Classes Successfully Avoided
        </p>
        <div className="bg-rose-100 border-r-5 border-b-5 border-1 border-rose-500 px-6 py-3 transform -rotate-1">
          <p className="text-sm text-rose-800 font-mono">
            That&apos;s{" "}
            <span className="font-black text-2xl">{hoursSaved}</span> hours
          </p>
          <p className="text-xs text-rose-600 mt-1">
            = <span className="font-bold">{days} days</span> of pure freedom 🎉
          </p>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="mt-6 text-xs text-zinc-500 italic"
      >
        Time is precious. You chose wisely.
      </motion.p>
    </Card>
  );
}
