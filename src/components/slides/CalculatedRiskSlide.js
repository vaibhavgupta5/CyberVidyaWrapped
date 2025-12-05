import { motion } from "framer-motion";
import Card from "../Card";
import Gauge from "../Gauge";
import GlitchText from "../GlitchText";
import Stamp from "../Stamp";
import { ShieldAlert, ShieldCheck } from "lucide-react";

export default function CalculatedRiskSlide({ data }) {
  const lowest = data.lowest;
  const isDangerous = lowest.percent < 75;

  return (
    <Card className="flex flex-col items-center justify-center text-center relative overflow-hidden h-full">
      {/* Hazard Strip for Dangerous */}
      {isDangerous && (
        <div
          className="absolute top-0 left-0 w-full h-3 opacity-60 z-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, #f43f5e, #f43f5e 10px, transparent 10px, transparent 20px)",
          }}
        />
      )}

      <div className="w-full flex justify-between items-start px-2 mb-4 absolute top-6 left-0 right-0">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest ml-6"
        >
          Risk Assessment
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`text-[10px] font-bold border px-2 py-0.5   mr-6 ${
            isDangerous
              ? "border-rose-500 text-rose-600"
              : "border-emerald-500 text-emerald-600"
          }`}
        >
          {isDangerous ? "CRITICAL" : "STABLE"}
        </motion.div>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="mb-6 mt-8 relative"
      >
        <div className="absolute inset-0 bg-zinc-100  -full scale-125 -z-10" />
        {isDangerous ? (
          <ShieldAlert size={56} className="text-rose-600" />
        ) : (
          <ShieldCheck size={56} className="text-emerald-600" />
        )}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-black text-zinc-800 font-permanent-marker transform -rotate-1 mb-6"
      >
        Calculated Risk
      </motion.h2>

      <div className="mb-6 scale-110">
        <Gauge percent={lowest.percent} size={160} />
      </div>

      <div className="mb-8">
        <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mb-1">
          Lowest Attendance
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg font-black text-black"
        >
          <GlitchText text={lowest.name} isGlitching={isDangerous} />
        </motion.div>
        <p className="text-zinc-400 font-mono text-[10px] mt-1">
          {lowest.code}
        </p>
      </div>

      {isDangerous ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-rose-50 border-2 border-rose-500 px-4 py-2   transform rotate-1 max-w-xs relative"
        >
          <p className="text-rose-700 font-bold text-sm italic">
            &quot;Living on the edge.&quot;
          </p>
          <div className="absolute -right-6 -bottom-6 transform scale-75">
            <Stamp
              text="WARNING"
              color="text-rose-600"
              borderColor="border-rose-600"
              rotate={-12}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-emerald-50 border-2 cool-border px-4 py-2   transform -rotate-1 max-w-xs"
        >
          <p className="text-emerald-700 font-bold text-sm italic">
            &quot;Safe... for now.&quot;
          </p>
        </motion.div>
      )}
    </Card>
  );
}
