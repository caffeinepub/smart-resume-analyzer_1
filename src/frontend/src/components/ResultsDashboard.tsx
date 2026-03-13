import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Briefcase,
  CheckCircle2,
  Hash,
  Lightbulb,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ResumeAnalysis } from "../backend.d";
import ScoreRing from "./ScoreRing";

interface ResultsDashboardProps {
  result: ResumeAnalysis;
}

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(target * eased));
      if (progress < 1) frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration]);

  return count;
}

const SKILL_COLORS = [
  {
    bg: "oklch(0.65 0.28 285 / 0.15)",
    border: "oklch(0.65 0.28 285 / 0.4)",
    text: "oklch(0.78 0.22 285)",
  },
  {
    bg: "oklch(0.72 0.18 198 / 0.15)",
    border: "oklch(0.72 0.18 198 / 0.4)",
    text: "oklch(0.82 0.15 198)",
  },
  {
    bg: "oklch(0.72 0.17 155 / 0.15)",
    border: "oklch(0.72 0.17 155 / 0.4)",
    text: "oklch(0.82 0.14 155)",
  },
  {
    bg: "oklch(0.78 0.18 80 / 0.15)",
    border: "oklch(0.78 0.18 80 / 0.4)",
    text: "oklch(0.88 0.15 80)",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

export default function ResultsDashboard({ result }: ResultsDashboardProps) {
  const wordCount = useCountUp(Number(result.wordCount));
  const expYears = useCountUp(Number(result.experienceYears));
  const score = Number(result.overallScore);

  return (
    <section data-ocid="results.section" className="relative py-20 px-6">
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">
            Analysis <span className="gradient-text">Results</span>
          </h2>
          <p className="text-muted-foreground">
            Your resume has been analyzed. Here's what we found.
          </p>
        </motion.div>

        {/* Top row: Score + Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Score Ring Card */}
          <motion.div
            data-ocid="score.card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center md:col-span-1 text-center"
          >
            <p className="font-display text-sm font-semibold text-muted-foreground mb-6 uppercase tracking-wider">
              Overall Score
            </p>
            <ScoreRing score={score} size={180} />
          </motion.div>

          {/* Stats Cards */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Hash,
                label: "Word Count",
                value: wordCount,
                suffix: "",
                color: "oklch(0.65 0.28 285)",
                glow: "var(--glow-purple)",
              },
              {
                icon: Briefcase,
                label: "Experience",
                value: expYears,
                suffix: " yrs",
                color: "oklch(0.72 0.18 198)",
                glow: "var(--glow-cyan)",
              },
              {
                icon: BookOpen,
                label: "Education",
                value: result.educationLevel,
                suffix: "",
                isText: true,
                color: "oklch(0.72 0.17 155)",
                glow: "var(--glow-emerald)",
              },
            ].map(
              ({ icon: Icon, label, value, suffix, isText, color, glow }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="glass-card rounded-2xl p-6 flex flex-col items-start"
                  style={{ boxShadow: `0 4px 24px ${glow}` }}
                >
                  <div
                    className="p-2 rounded-xl mb-4"
                    style={{ background: `${color}22` }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <div
                    className="font-display text-3xl font-bold count-up mb-1"
                    style={{ color }}
                  >
                    {isText ? value : `${value}${suffix}`}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {label}
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </div>

        {/* Skills Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="glass-card rounded-2xl p-6 md:p-8 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.65 0.28 285 / 0.2)" }}
            >
              <span className="text-sm">⚡</span>
            </div>
            <h3 className="font-display text-xl font-bold">Detected Skills</h3>
            <Badge variant="secondary" className="ml-auto">
              {result.skills.length} skills
            </Badge>
          </div>
          <div data-ocid="skills.list" className="flex flex-wrap gap-2">
            {result.skills.map((skill, i) => {
              const c = SKILL_COLORS[i % SKILL_COLORS.length];
              return (
                <motion.span
                  key={skill}
                  variants={itemVariants}
                  className="px-3 py-1.5 rounded-full text-sm font-medium cursor-default"
                  style={{
                    background: c.bg,
                    border: `1px solid ${c.border}`,
                    color: c.text,
                  }}
                  whileHover={{ scale: 1.08, y: -2 }}
                >
                  {skill}
                </motion.span>
              );
            })}
          </div>
        </motion.div>

        {/* Strengths + Suggestions row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Strengths */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="glass-card-emerald rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "oklch(0.72 0.17 155 / 0.25)" }}
              >
                <CheckCircle2
                  className="w-4 h-4"
                  style={{ color: "oklch(0.72 0.17 155)" }}
                />
              </div>
              <h3 className="font-display text-xl font-bold gradient-text-emerald">
                Strengths
              </h3>
            </div>
            <ul data-ocid="strengths.list" className="space-y-3">
              {result.strengths.map((s) => (
                <motion.li
                  key={s}
                  variants={slideInLeft}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: "oklch(0.72 0.17 155)" }}
                  />
                  <span className="text-sm text-foreground/80 leading-relaxed">
                    {s}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Suggestions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="glass-card-amber rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "oklch(0.78 0.18 80 / 0.25)" }}
              >
                <Lightbulb
                  className="w-4 h-4"
                  style={{ color: "oklch(0.78 0.18 80)" }}
                />
              </div>
              <h3 className="font-display text-xl font-bold gradient-text-amber">
                Suggestions
              </h3>
            </div>
            <ul data-ocid="suggestions.list" className="space-y-3">
              {result.suggestions.map((s) => (
                <motion.li
                  key={s}
                  variants={slideInRight}
                  className="flex items-start gap-3"
                >
                  <Lightbulb
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: "oklch(0.78 0.18 80)" }}
                  />
                  <span className="text-sm text-foreground/80 leading-relaxed">
                    {s}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
