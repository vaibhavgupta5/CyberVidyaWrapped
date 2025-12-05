import { motion } from "framer-motion";
import Card from "../Card";
import TallyMarks from "../TallyMarks";

export default function BunkStatsSlide({ data }) {
  const totalBunks = data.totalBunks || 0;
  const hoursSaved = data.hoursSaved || 0;

  return (
    <Card className="flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-bold text-zinc-500 uppercase tracking-widest mb-8"
      >
        Bunk Stats
      </motion.div>

      <div className="mb-8 min-h-[120px] flex items-center justify-center">
        <TallyMarks count={totalBunks} />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="space-y-4"
      >
        <h2 className="text-4xl font-black text-black font-mono">
          {totalBunks} Classes
        </h2>
        <p className="text-xl text-zinc-600 font-permanent-marker transform -rotate-1">
          &quot;Strategically Missed&quot;
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring" }}
        className="mt-12 bg-black text-white px-6 py-3  -sm transform rotate-1  -lg"
      >
        <span className="font-bold text-2xl">{hoursSaved}</span> Hours Saved
      </motion.div>
    </Card>
  );
}
