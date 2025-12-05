import { motion } from "framer-motion";
import Card from "../Card";
import { RotateCcw, Download, Heart } from "lucide-react";

export default function CreditsSlide({ onReplay, onDownload }) {
  return (
    <Card className="flex flex-col items-center justify-center text-center h-full">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="mb-8"
      >
        <div className="text-6xl mb-4">🎬</div>
        <h2 className="text-4xl font-black text-black mb-2 font-permanent-marker transform -rotate-2">
          That&apos;s a Wrap!
        </h2>
        <p className="text-zinc-600 font-mono text-sm">
          Your year in attendance, summarized.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="space-y-4 mb-8"
      >
        <button
          onClick={onReplay}
          className="flex items-center gap-3 px-8 py-4 bg-black text-white  -sm font-bold text-lg hover:scale-105 transition-transform border-2 border-black  -[6px_6px_0px_0px_rgba(0,0,0,1)]"
        >
          <RotateCcw size={24} />
          Watch Again
        </button>

        <button
          onClick={onDownload}
          className="flex items-center gap-3 px-8 py-4 bg-emerald-500 text-white  -sm font-bold text-lg hover:scale-105 transition-transform border-2 border-black  -[6px_6px_0px_0px_rgba(0,0,0,1)]"
        >
          <Download size={24} />
          Download Video
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-auto pt-8 border-t-2 border-dashed border-zinc-300 w-full"
      >
        <p className="text-xs text-zinc-500 font-mono flex items-center justify-center gap-2">
          Made with <Heart size={12} className="text-rose-500 fill-rose-500" />{" "}
          by CyberVidya
        </p>
        <p className="text-[10px] text-zinc-400 mt-2">
          © 2025 • Track your progress, own your story
        </p>
      </motion.div>
    </Card>
  );
}
