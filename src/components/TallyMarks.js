import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.1, type: "spring", duration: 0.5, bounce: 0 },
      opacity: { delay: i * 0.1, duration: 0.01 },
    },
  }),
};

const TallyGroup = ({ index, isFull, remainder }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    className="stroke-zinc-800 stroke-2 fill-none"
  >
    {/* 4 vertical lines */}
    <motion.path
      d="M10,5 L10,35"
      variants={draw}
      custom={index * 5 + 0}
      initial="hidden"
      animate="visible"
    />
    {isFull || remainder >= 2 ? (
      <motion.path
        d="M15,5 L15,35"
        variants={draw}
        custom={index * 5 + 1}
        initial="hidden"
        animate="visible"
      />
    ) : null}
    {isFull || remainder >= 3 ? (
      <motion.path
        d="M20,5 L20,35"
        variants={draw}
        custom={index * 5 + 2}
        initial="hidden"
        animate="visible"
      />
    ) : null}
    {isFull || remainder >= 4 ? (
      <motion.path
        d="M25,5 L25,35"
        variants={draw}
        custom={index * 5 + 3}
        initial="hidden"
        animate="visible"
      />
    ) : null}

    {/* Diagonal line for 5th */}
    {isFull && (
      <motion.path
        d="M5,35 L30,5"
        variants={draw}
        custom={index * 5 + 4}
        initial="hidden"
        animate="visible"
        className="stroke-rose-500"
      />
    )}
  </svg>
);

export default function TallyMarks({ count }) {
  // Group into sets of 5
  const groups = Math.floor(count / 5);
  const remainder = count % 5;

  return (
    <div className="flex flex-wrap gap-2 max-w-md justify-center">
      {Array.from({ length: groups }).map((_, i) => (
        <TallyGroup key={i} index={i} isFull={true} remainder={0} />
      ))}
      {remainder > 0 && (
        <TallyGroup index={groups} isFull={false} remainder={remainder} />
      )}
    </div>
  );
}
