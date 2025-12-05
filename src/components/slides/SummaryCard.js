import { motion } from "framer-motion";
import Card from "../Card";
import Stamp from "../Stamp";
import {
  User,
  QrCode,
  Fingerprint,
  ScanBarcode,
  Brain,
  FlaskConical,
  ShieldCheck,
  ShieldAlert,
  Clock,
  Cpu,
} from "lucide-react";

export default function SummaryCard({ data, user }) {
  const overall = data.overallPercent;
  const verdict = overall >= 75 ? "PROMOTED" : "DETAINED";
  const isSafe = overall >= 75;
  const verdictColor = isSafe ? "text-emerald-600" : "text-rose-600";
  const stampBorder = isSafe ? "border-emerald-600" : "border-rose-600";

  // Logic for the "Persona" Tag
  const getPersona = () => {
    if (overall >= 95) return "ACADEMIC WEAPON";
    if (overall >= 85) return "SCHOLAR";
    if (overall >= 75) return "SURVIVOR";
    if (overall >= 60) return "RISK TAKER";
    return "GHOST";
  };

  const persona = getPersona();
  const personaBg = isSafe ? "bg-emerald-600" : "bg-rose-600";

  // --- STATS CALCULATIONS ---
  const labs =
    data.flatData?.filter(
      (c) =>
        c.type?.toLowerCase().includes("lab") ||
        c.name.toLowerCase().includes("lab")
    ) || [];
  const theory =
    data.flatData?.filter(
      (c) =>
        !c.type?.toLowerCase().includes("lab") &&
        !c.name.toLowerCase().includes("lab")
    ) || [];

  const labAvg = labs.length
    ? Math.round(labs.reduce((acc, c) => acc + c.percent, 0) / labs.length)
    : 0;
  const theoryAvg = theory.length
    ? Math.round(theory.reduce((acc, c) => acc + c.percent, 0) / theory.length)
    : 0;

  const focusArea = labAvg >= theoryAvg ? "LABS" : "THEORY";
  const FocusIcon = labAvg >= theoryAvg ? FlaskConical : Brain;

  // Bunk Buffer
  const currentPresent = data.totalPresent || 0;
  const currentTotal = data.totalClasses || 0;
  let bufferValue = 0;
  let bufferLabel = "";
  let bufferColorClass = "";

  if (isSafe) {
    const maxBunks = Math.floor(currentPresent / 0.75 - currentTotal);
    bufferValue = `${maxBunks}`;
    bufferLabel = "BUNKED";
    bufferColorClass = "text-emerald-600";
  } else {
    const needed = Math.ceil((0.75 * currentTotal - currentPresent) / 0.25);
    bufferValue = `-${needed}`;
    bufferLabel = "SHORTFALL";
    bufferColorClass = "text-rose-600";
  }

  const timeReclaimed = `${data.totalBunks || 0}h`;

  return (
    <div
      className=" w-full  flex  justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 "
      data-summary-card
    >
      <Card className="p-0! overflow-hidden flex flex-col bg-[#f0f0f0] relative  -2xl border-2 border-zinc-400  -2xl w-full max-w-md h-full scale5 ">
        {/* Global Noise Texture */}
        <div className="absolute inset-0 opacity-40 pointer-events-none z-0 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

        {/* Lanyard Hole */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-zinc-800  -full z-20  -[inset_0_2px_6px_rgba(0,0,0,0.8)] border-b-2 border-zinc-600 flex items-center justify-center">
          <div className="w-14 h-1 bg-zinc-900  -full opacity-60" />
        </div>

        {/* --- HEADER --- */}
        <div className="bg-zinc-950 p-6 pt-9 pb-6 w-full flex justify-between items-center text-white relative overflow-hidden border-b-4 border-emerald-500 z-10 shrink-0">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10" />

          <div className="flex items-center gap-2 z-10">
            <div className="w-12 h-12 bg-white  flex items-center justify-center rounded-full p-1  -[0_0_20px_rgba(16,185,129,0.5)] ">
              <img
                src="https://globaleducation.s3.ap-south-1.amazonaws.com/cyber-vidya/images/favicon.ico"
                alt="logo"
                className=" -full w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-black text-xl tracking-widest leading-none font-sans">
                CYBER<span className="text-emerald-400">VIDYA</span>
              </h3>
              <p className="text-[10px] text-zinc-500 font-mono tracking-[0.3em] mt-1 uppercase">
                Official Student Record
              </p>
            </div>
          </div>

          {/* Chip */}
          <div className="w-12 h-9 bg-gradient-to-br from-yellow-200 to-yellow-600   opacity-90  -md border border-yellow-700 flex flex-col justify-center items-center gap-[2px] z-10 relative">
            <div className="w-full h-[1px] bg-yellow-800/30" />
            <div className="w-[1px] h-full bg-yellow-800/30 absolute" />
            <Cpu size={14} className="text-yellow-900/40" />
          </div>
        </div>

        {/* --- CONTENT --- */}
        <div className="flex-1 flex flex-col relative z-10 justify-between p-4">
          {/* IDENTITY SECTION */}
          <div className="text-center space-y-2">
            <p className="text-[10px] text-zinc-400 uppercase tracking-[0.3em] font-bold font-mono">
              Student Identity
            </p>
            <div className="flex gap-2 justify-center">
              <div className="bg-zinc-200 px-3 py-1   text-[10px] font-bold text-zinc-600 font-mono  -sm">
                {user?.rollNumber?.trim() || "N/A"}
              </div>
              <div className="bg-zinc-200 px-3 py-1   text-[10px] font-bold text-zinc-600 font-mono  -sm">
                {user?.branchShortName}
              </div>
            </div>
          </div>

          {/* PHOTO SECTION - CENTER */}
          <div className="flex flex-col mt-4 items-center justify-center gap-4">
            {/* Photo with Corners */}
            <div className="relative group">
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-4 border-l-4 border-zinc-900 z-20" />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-t-4 border-r-4 border-zinc-900 z-20" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-4 border-l-4 border-zinc-900 z-20" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-4 border-r-4 border-zinc-900 z-20" />

              <div className="w-35 h-42 bg-zinc-200  -2xl overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700 border-2 border-zinc-300">
                {user?.photoUrl ? (
                  <img
                    src={user.photoUrl}
                    alt="Student"
                    className="w-full h-full object-cover mix-blend-multiply"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-zinc-400">
                    <User size={64} />
                  </div>
                )}
              </div>

              {/* Persona Badge */}
              <div
                className={`absolute -bottom-4 left-1/2 -translate-x-1/2 ${personaBg} text-white text-xs font-black px-4 py-1.5  -md  -lg whitespace-nowrap tracking-widest border-2 border-zinc-900 z-30`}
              >
                {persona}
              </div>
            </div>

            {/* Name */}
            <div className="mt-4 text-center">
              <p className="font-black text-2xl font-sans text-zinc-900 leading-tight uppercase">
                {user?.fullName || "Unknown"}
              </p>
            </div>
          </div>

          {/* STATS SECTION */}
          <div className="space-y-4">
            {/* Combined Skill Bar */}
            <div className="space-y-2 mt-3">
              <div className="w-full h-5 bg-zinc-200 border-b-3 border-r-3 border-black  overflow-hidden  -inner flex">
                {/* Theory Segment */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${theoryAvg}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 flex items-center justify-end pr-1 text-[9px] font-bold text-white"
                >
                  {theoryAvg > 10 && <span>{theoryAvg}% Theory</span>}
                </motion.div>

                {/* Labs Segment */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${labAvg}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-black to-black flex items-center justify-end pr-1 text-[9px] font-bold text-white"
                >
                  {labAvg > 10 && <span>{labAvg}% Labs</span>}
                </motion.div>
              </div>
            </div>

            {/* METRICS GRID */}
            <div className="grid grid-cols-4 gap-2 mt-6">
              {/* Overall */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-4 flex flex-col items-center justify-center  -xl  -lg border border-zinc-200 cool-border"
              >
                <p
                  className={`text-2xl font-black mt-2 ${
                    isSafe ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {overall}%
                </p>
                <p className="text-[7px] font-bold text-zinc-400 uppercase tracking-wider mt-1">
                  Attendance
                </p>
              </motion.div>

              {/* Buffer */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-4 flex flex-col items-center justify-center  -xl  -lg border border-zinc-200 cool-border"
              >
                <p className={`text-2xl font-black mt-2 ${bufferColorClass}`}>
                  {bufferValue}
                </p>
                <p className="text-[7px] font-bold text-zinc-400 uppercase tracking-wider mt-1">
                  {bufferLabel}
                </p>
              </motion.div>

              {/* Time Saved */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white p-4 flex flex-col items-center justify-center  -xl  -lg border border-zinc-200 cool-border"
              >
                <p className="text-2xl font-black mt-2 text-zinc-700">
                  {timeReclaimed}
                </p>
                <p className="text-[7px] font-bold text-zinc-400 uppercase tracking-wider mt-1">
                  Free Time
                </p>
              </motion.div>

              {/* Focus */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white p-4 flex flex-col items-center justify-center  -xl  -lg border border-zinc-200 cool-border"
              >
                <p className="text-sm font-black mt-2 text-purple-900 bg-purple-100 px-2 py-1  ">
                  {focusArea}
                </p>
                <p className="text-[7px] font-bold text-zinc-400 uppercase tracking-wider mt-1">
                  Focus
                </p>
              </motion.div>
            </div>
          </div>

          {/* FOOTER SECTION */}
          <div className="flex justify-between items-end  border-t-2 border-dashed border-zinc-300 mt-6">
            <div className="flex flex-col gap-1">
              <div
                className="font-serif italic text-2xl text-blue-800 opacity-90 -rotate-2 mix-blend-multiply"
                style={{ fontFamily: '"Brush Script MT", cursive' }}
              >
                {user?.fullName?.split(" ")[0] || "Authorized"}
              </div>
              <p className="text-[8px] text-zinc-400 font-mono uppercase tracking-wider">
                Student Signature
              </p>
            </div>

            <div className="flex flex-col items-end gap-1">
              <ScanBarcode size={40} className="text-zinc-900" />
              <p className="text-[9px] font-mono text-zinc-400 tracking-tight">
                {user?.registrationNumber || "ID-8842-X"}
              </p>
            </div>
          </div>
        </div>

        {/* Verdict Stamp */}
        <div className="absolute top-1/2 right-8 transform -translate-y-1/2 rotate-[-12deg] opacity-95 z-30 pointer-events-none">
          <Stamp
            text={verdict}
            color={isSafe ? "text-emerald-700" : "text-rose-700"}
            borderColor={isSafe ? "border-emerald-700" : "border-rose-700"}
            rotate={0}
          />
        </div>

       

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-blue-900/10 opacity-100 pointer-events-none z-5" />
      </Card>
    </div>
  );
}
