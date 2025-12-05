import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import Card from "../Card";
import { Sparkles } from "lucide-react";

export default function IntroSlide({ data }) {
  const totalClasses = data.totalClasses || 0;
  const springValue = useSpring(0, { bounce: 0, duration: 2000 });
  const displayValue = useTransform(springValue, (value) => Math.round(value));

  useEffect(() => {
    springValue.set(totalClasses);
  }, [totalClasses, springValue]);

  return (
    <Card className="flex flex-col items-center justify-center h-full text-center relative overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-4xl font-black mb-4 text-zinc-800 font-permanent-marker transform -rotate-2"
      >
        The BUNK Wrap 2025
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm text-zinc-600 mb-8 font-mono uppercase tracking-wider"
      >
        Your Attendance Story
      </motion.p>

      <div className="relative mb-8">
        <motion.div
          className="text-9xl font-black text-black font-mono tracking-tighter"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
        >
          <motion.span>{displayValue}</motion.span>
        </motion.div>

        <motion.div
          initial={{ scale: 0, rotate: 12 }}
          animate={{ scale: 1, rotate: -6 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
          className="absolute -bottom-6 -right-12 bg-emerald-500 text-white px-6 py-2 font-permanent-marker text-2xl -rotate-6  -xl border-3 cool-border"
        >
          Attended!
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="mt-12 space-y-2"
      >
        <p className="text-lg text-zinc-600 font-mono italic">
          (That&apos;s a lot of &quot;Present, Sir!&quot;)
        </p>
        <p className="text-xs text-zinc-400">Swipe to see your journey →</p>
      </motion.div>
    </Card>
  );
}
