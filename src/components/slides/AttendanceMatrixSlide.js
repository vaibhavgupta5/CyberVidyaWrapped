import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../Card";
import { BarChart3, TrendingUp, TrendingDown } from "lucide-react";

export default function AttendanceMatrixSlide({ data }) {
  const courses = data.flatData || [];
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Sort courses by percentage for better visualization
  const sortedCourses = [...courses].sort((a, b) => b.percent - a.percent);

  // Calculate average
  const averageAttendance =
    courses.length > 0
      ? Math.round(
          courses.reduce((sum, c) => sum + c.percent, 0) / courses.length
        )
      : 0;

  return (
    <Card className="flex flex-col h-full p-6">
      {/* Header */}
      <div className="text-center mb-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          className="inline-block mb-2"
        >
          <BarChart3 size={32} className="text-zinc-700" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-black text-zinc-800 font-permanent-marker transform -rotate-1"
        >
          The Matrix
        </motion.h2>
        <p className="text-xs text-zinc-500 font-mono">
          Subject-wise Breakdown
        </p>
      </div>

      {/* Stats Bar */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 bg-zinc-50 border-2 border-zinc-200 p-2    -sm flex flex-col justify-center items-center cool-border">
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
            Subjects
          </p>
          <p className="text-xl font-black text-black">{courses.length}</p>
        </div>
        <div className="flex-1 bg-zinc-50 border-2 border-zinc-200 p-2    -sm flex flex-col justify-center items-center cool-border">
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
            Average
          </p>
          <p className="text-xl font-black text-black">{averageAttendance}%</p>
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="flex-1 relative overflow-hidden bg-white border-2 border-zinc-100  -lg p-2">
        {/* 75% Danger Line */}
        <div className="absolute left-0 right-0 top-0 h-full pointer-events-none z-10">
          <div className="absolute left-0 right-0 top-[25%] border-t-2 border-dashed border-rose-400 opacity-60">
            <span className="absolute -top-4 right-1 text-[9px] text-rose-500 font-bold bg-white/80 px-1  ">
              75%
            </span>
          </div>
        </div>

        {/* Scrollable Bars */}
        <div className="h-full overflow-x-auto overflow-y-hidden pb-2 scrollbar-hide">
          <div className="h-full flex items-end gap-2 min-w-max px-2 pb-6 ">
            {sortedCourses.map((course, i) => {
              const isBelow75 = course.percent < 75;
              const isSelected = selectedCourse === i;
              const barColor = isBelow75
                ? "bg-rose-500"
                : course.percent >= 90
                ? "bg-emerald-500"
                : "bg-zinc-800";

              return (
                <motion.div
                  key={i}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "100%", opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="flex flex-col items-center justify-end cursor-pointer relative "
                  onClick={() => setSelectedCourse(isSelected ? null : i)}
                  style={{ minWidth: "25px" }}
                >
                  {/* Bar */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      delay: i * 0.05 + 0.2,
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    className={`w-full relative ${barColor}  -t-sm border-2 border-black origin-bottom transition-all duration-200 cool-border ${
                      isSelected
                        ? "ring-2 ring-offset-1 ring-black"
                        : "opacity-90"
                    }`}
                    style={{
                      height: `${course.percent}%`,
                      minHeight: "20px",
                    }}
                  >
                    {/* Icon indicator */}
                    {course.percent >= 90 && (
                      <TrendingUp
                        size={10}
                        className="absolute top-1 left-1/2 -translate-x-1/2 text-white/80"
                      />
                    )}
                    {isBelow75 && (
                      <TrendingDown
                        size={10}
                        className="absolute top-1 left-1/2 -translate-x-1/2 text-white/80"
                      />
                    )}
                  </motion.div>

                  {/* Label - First Word of Course Name */}
                  <div className="absolute -bottom-6 w-full text-center">
                    <p className="text-[9px] font-bold text-zinc-700 truncate px-0.5 transform rotate-90 origin-top-left translate-x-2">
                      {course.name.split(" ")[0]}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
