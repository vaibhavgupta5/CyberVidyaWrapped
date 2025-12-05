import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { flattenAttendanceData, calculateStats } from "../utils/attendance";
import { useAttendanceStore } from "../store/useAttendanceStore";
import IntroSlide from "./slides/IntroSlide";
import TeachersPetSlide from "./slides/TeachersPetSlide";
import CalculatedRiskSlide from "./slides/CalculatedRiskSlide";
import TechVsTheorySlide from "./slides/TechVsTheorySlide";
import TheGreatEscapeSlide from "./slides/TheGreatEscapeSlide";
import AttendanceMatrixSlide from "./slides/AttendanceMatrixSlide";
import SummaryCard from "./slides/SummaryCard";
import StoryProgress from "./StoryProgress";
import html2canvas from "html2canvas";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Download,
} from "lucide-react";

const SLIDE_DURATION = 5000;

export default function AttendanceManager() {
  const rawData = useAttendanceStore((state) => state.attendanceData);
  const user = useAttendanceStore((state) => state.user);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const summaryCardRef = useRef(null);

  const flatData = flattenAttendanceData(rawData);
  const stats = calculateStats(flatData);
  const fullData = { ...stats, flatData };

  const slides = [
    { component: IntroSlide, data: fullData },
    { component: TeachersPetSlide, data: fullData },
    { component: CalculatedRiskSlide, data: fullData },
    { component: TechVsTheorySlide, data: fullData },
    { component: TheGreatEscapeSlide, data: fullData },
    { component: AttendanceMatrixSlide, data: fullData },
    { component: SummaryCard, data: fullData, user: user },
  ];

  // Download Summary Card as PNG
  const downloadSummaryCard = async () => {
    try {
      // Temporarily hide the overlay to capture clean card
      setIsFinished(false);

      // Wait for overlay to hide and card to be visible
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Find the summary card element
      const summaryElement = document.querySelector("[data-summary-card]");
      if (!summaryElement) {
        console.error("Summary card element not found");
        setIsFinished(true); // Restore overlay
        return;
      }

      // Capture the element as canvas with error handling for unsupported colors
      const canvas = await html2canvas(summaryElement, {
        backgroundColor: null,
        scale: 2, // Higher quality
        logging: false,
        useCORS: true,
     onclone: (clonedDoc) => {
  const all = clonedDoc.querySelectorAll("*");

  all.forEach((el) => {
    const cs = window.getComputedStyle(el);

    const fixColor = (value, fallback = "#000000") => {
      if (!value) return fallback;

      if (
        value.includes("oklab(") ||
        value.includes("lab(") ||
        value.includes("p3") ||
        value.includes("display-p3")
      ) {
        return fallback;
      }
      return value;
    };

    // TEXT
    el.style.color = fixColor(cs.color, "#000");

    // BACKGROUND
    if (cs.backgroundImage && cs.backgroundImage.includes("gradient")) {
      el.style.backgroundImage = "none";
    }
    el.style.backgroundColor = fixColor(cs.backgroundColor, "#fff");

    // BORDER
    el.style.borderColor = fixColor(cs.borderColor, "#000");

    // BOX SHADOW → remove (shadow colors often cause LAB)
    el.style.boxShadow = "none";
    el.style.filter = "none";

    // SVG FIXES
    if (el.tagName === "svg" || el.tagName === "path" || el.tagName === "rect") {
      const fill = el.getAttribute("fill");
      const stroke = el.getAttribute("stroke");

      if (fill && fill.includes("oklab")) el.setAttribute("fill", "#000");
      if (stroke && stroke.includes("oklab")) el.setAttribute("stroke", "#000");

      // Force-safe SVG colors
      if (!fill || fill === "none") el.setAttribute("fill", "#000");
      if (!stroke || stroke === "none") el.setAttribute("stroke", "#000");
    }
  });
}

      });

      // Convert to blob and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `CyberVidya_Wrapped_${user?.rollNumber || "2025"}.png`;
        a.click();
        URL.revokeObjectURL(url);

        // Restore the overlay after download
        setIsFinished(true);
      }, "image/png");
    } catch (err) {
      console.error("Error downloading summary card:", err);
      // Restore overlay on error
      setIsFinished(true);
    }
  };

  // Auto-advance logic
  useEffect(() => {
    if (isPaused || isFinished) return;

    const timer = setTimeout(() => {
      if (currentIndex < slides.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsFinished(true);
      }
    }, SLIDE_DURATION);

    return () => clearTimeout(timer);
  }, [currentIndex, isPaused, isFinished, slides.length]);

  // Audio Logic
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      if (!isPaused && !isFinished) {
        audioRef.current.play().catch(() => {
          // Auto-play might be blocked, waiting for interaction
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPaused, isFinished]);

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const handleTap = (e) => {
    // Ensure audio plays on first interaction
    if (
      audioRef.current &&
      audioRef.current.paused &&
      !isPaused &&
      !isFinished
    ) {
      audioRef.current.play().catch(console.error);
    }

    const width = e.currentTarget.offsetWidth;
    const x = e.nativeEvent.offsetX;

    if (x < width * 0.3) {
      // Left tap
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
        setIsFinished(false);
      }
    } else if (x > width * 0.7) {
      // Right tap
      if (currentIndex < slides.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsFinished(true);
      }
    } else {
      // Center tap (pause/resume)
      setIsPaused((prev) => !prev);
    }
  };

  const CurrentSlide = slides[currentIndex].component;

  return (
    <div className="w-full max-w-md h-[700px] relative flex flex-col items-center justify-center paper-texture  -xl overflow-hidden  -2xl border-4 border-black">
      <audio ref={audioRef} src="/audio.mp3" loop />

      {/* Progress Bars */}
      {!isFinished && (
        <StoryProgress
          count={slides.length}
          activeIndex={currentIndex}
          duration={SLIDE_DURATION}
        />
      )}

      {/* Control Buttons */}
      <div className="absolute top-6 right-4 z-50 flex gap-2">
        {/* Play/Pause Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsPaused(!isPaused);
          }}
          className="p-2 bg-black/10  -full hover:bg-black/20 transition-colors"
          title={isPaused ? "Play" : "Pause"}
        >
          {isPaused ? (
            <Play size={20} className="text-black" fill="currentColor" />
          ) : (
            <Pause size={20} className="text-black" />
          )}
        </button>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className="p-2 bg-black/10  -full hover:bg-black/20 transition-colors"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX size={20} className="text-black" />
          ) : (
            <Volume2 size={20} className="text-black" />
          )}
        </button>
      </div>

      {/* Slide Content */}
      <div
        className="w-full h-full relative cursor-pointer"
        onClick={handleTap}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full p-4"
          >
            <CurrentSlide
              data={slides[currentIndex].data}
              user={slides[currentIndex].user}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls Overlay - Only when finished */}
      {isFinished && (
        <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center gap-6 z-50 backdrop-blur-sm">
          <div className="text-center">
            <h2 className="text-3xl font-black text-black mb-2 font-permanent-marker transform -rotate-2">
              That&apos;s a Wrap!
            </h2>
            <p className="text-zinc-600 mb-6 font-mono">
              Share your stats with the world.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentIndex(0);
              setIsFinished(false);
              setIsPaused(false);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-black text-white  -full font-bold hover:scale-105 transition-transform border-2 border-black  -[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <RotateCcw size={20} />
            Replay Story
          </button>

          <button
            onClick={downloadSummaryCard}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white  -full font-bold hover:scale-105 transition-transform border-2 border-black  -[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <Download size={20} />
            Download Summary
          </button>
        </div>
      )}
    </div>
  );
}
