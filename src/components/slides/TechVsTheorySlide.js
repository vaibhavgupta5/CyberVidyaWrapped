import { motion } from "framer-motion";
import Card from "../Card";
import { Code, BookOpen } from "lucide-react";

export default function TechVsTheorySlide({ data }) {
  const flatData = data.flatData || [];

  // Separate lab and theory subjects
  const labSubjects = flatData.filter(
    (course) =>
      course.type?.toLowerCase().includes("lab") ||
      course.name.toLowerCase().includes("lab")
  );

  const theorySubjects = flatData.filter(
    (course) =>
      !course.type?.toLowerCase().includes("lab") &&
      !course.name.toLowerCase().includes("lab")
  );

  const labAvg =
    labSubjects.length > 0
      ? Math.round(
          labSubjects.reduce((sum, s) => sum + s.percent, 0) /
            labSubjects.length
        )
      : 0;

  const theoryAvg =
    theorySubjects.length > 0
      ? Math.round(
          theorySubjects.reduce((sum, s) => sum + s.percent, 0) /
            theorySubjects.length
        )
      : 0;

  return (
    <Card className="flex flex-col items-center justify-center text-center h-full">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-black text-zinc-800 mb-8 font-permanent-marker transform -rotate-1"
      >
        Tech vs. Theory
      </motion.h2>

      <div className="w-full grid grid-cols-2 gap-4 mb-8">
        {/* Labs Side - Bright */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative bg-linear-to-br from-emerald-50 to-emerald-100 border-4 border-emerald-600 border-r-6 border-b-6 p-6  -lg  -lg"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-4 py-1  -full font-bold text-sm">
            LABS
          </div>
          <Code size={48} className="text-emerald-600 mx-auto mb-4" />
          <div className="text-5xl font-black text-emerald-700 mb-2">
            {labAvg}%
          </div>
          <div className="text-xs text-emerald-800 font-mono uppercase">
            Action Hero
          </div>
        </motion.div>

        {/* Theory Side - Dim */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative bg-linear-to-br from-zinc-100 to-zinc-200 border-4 border-r-6 border-b-6  border-zinc-400 p-6  -lg  -lg opacity-75"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-zinc-500 text-white px-4 py-1  -full font-bold text-sm">
            THEORY
          </div>
          <BookOpen size={48} className="text-zinc-500 mx-auto mb-4" />
          <div className="text-5xl font-black text-zinc-600 mb-2">
            {theoryAvg}%
          </div>
          <div className="text-xs text-zinc-600 font-mono uppercase">
            Sleepy Reader
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="bg-black text-white px-6 py-3 font-permanent-marker text-2xl transform rotate-2  -lg"
      >
        Action &gt; Words
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-6 text-sm text-zinc-600 italic max-w-xs"
      >
        You showed up to code, but slept through the lectures.
      </motion.p>
    </Card>
  );
}
