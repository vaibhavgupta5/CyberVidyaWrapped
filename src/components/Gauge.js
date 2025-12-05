import { motion } from "framer-motion";

export default function Gauge({
  percent,
  size = 200,
  strokeWidth = 15,
  label = "Attendance",
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI; // Semi-circle
  const offset = circumference - (percent / 100) * circumference;

  // Determine color based on percent
  let color = "text-emerald-500";
  if (percent < 75) color = "text-rose-500";
  else if (percent < 85) color = "text-yellow-400";

  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{ width: size, height: size / 2 + 20 }}
    >
      <svg
        width={size}
        height={size / 2 + strokeWidth}
        className="overflow-visible"
      >
        {/* Background Arc */}
        <path
          d={`M ${strokeWidth / 2},${size / 2} A ${radius},${radius} 0 0,1 ${
            size - strokeWidth / 2
          },${size / 2}`}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Progress Arc */}
        <motion.path
          d={`M ${strokeWidth / 2},${size / 2} A ${radius},${radius} 0 0,1 ${
            size - strokeWidth / 2
          },${size / 2}`}
          fill="none"
          className={color}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>

      <div className="absolute bottom-0 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className={`text-4xl font-bold font-mono ${color}`}
        >
          {percent}%
        </motion.div>
        <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">
          {label}
        </p>
      </div>
    </div>
  );
}
