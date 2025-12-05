import { motion } from "framer-motion";
import Card from "../Card";
import Stamp from "../Stamp";
import { Trophy, Star, Award } from "lucide-react";

export default function TeachersPetSlide({ data }) {
  const highest = data.highest;

  return (
    <Card className="flex flex-col items-center justify-center text-center relative overflow-hidden h-full">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 transform -rotate-12">
          <Star size={48} className="text-yellow-500" />
        </div>
        <div className="absolute bottom-10 right-10 transform rotate-12">
          <Star size={64} className="text-yellow-500" />
        </div>
        <div className="absolute top-1/2 right-4 transform rotate-45">
          <Award size={32} className="text-emerald-500" />
        </div>
      </div>

      <motion.div
        initial={{ scale: 0, y: -50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mb-6 relative z-10"
      >
        <div className="relative">
          <Trophy size={64} className="text-yellow-500 drop- -md" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm font-bold text-zinc-400 uppercase tracking-[0.2em] mb-8 relative z-10"
      >
        Teacher&apos;s Pet Award
      </motion.div>

      <div className="relative mb-8 z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative w-48 h-48 flex items-center justify-center"
        >
          {/* Circular Progress Background */}
          <svg className="w-full h-full transform -rotate-90 ">
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="white"
              stroke="#f4f4f5"
              strokeWidth="12"
            />
            <motion.circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="#10b981"
              strokeWidth="12"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: highest.percent / 100 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="text-5xl font-black text-emerald-600 font-mono tracking-tighter"
            >
              {highest.percent}%
            </motion.span>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col items-center mt-1"
            >
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                Attendance
              </span>
              <span className="text-xs font-bold text-zinc-600 bg-zinc-100 px-2 py-0.5  -full mt-1 border border-zinc-200">
                {highest.present}/{highest.total} Classes
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-xs mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="text-2xl font-black text-zinc-800 mb-1 font-permanent-marker transform -rotate-1 leading-tight"
        >
          {highest.name}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-zinc-500 font-mono text-[10px] bg-zinc-100 inline-block px-2 py-1   border border-zinc-200"
        >
          {highest.code}
        </motion.p>
      </div>

      {highest.percent > 90 && (
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ delay: 2, type: "spring" }}
          className="mt-6 bg-yellow-50 border-2 cool-border px-4 py-2  -md transform rotate-1 relative z-10"
        >
          <p className="text-yellow-700 font-bold text-xs italic font-handwriting">
            &quot;You practically lived here!&quot;
          </p>
        </motion.div>
      )}

      <div className="absolute bottom-8 right-8 transform rotate-12 z-20">
        <Stamp
          text="NERD ALERT"
          color="text-emerald-600"
          borderColor="border-emerald-600"
          rotate={0}
        />
      </div>
    </Card>
  );
}
