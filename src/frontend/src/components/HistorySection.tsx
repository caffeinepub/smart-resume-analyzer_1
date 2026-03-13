import { Clock, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import type { ResumeAnalysis } from "../backend.d";

interface HistorySectionProps {
  analyses: ResumeAnalysis[];
  onSelect: (a: ResumeAnalysis) => void;
}

export default function HistorySection({
  analyses,
  onSelect,
}: HistorySectionProps) {
  if (analyses.length === 0) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "oklch(0.72 0.17 155)";
    if (score >= 60) return "oklch(0.78 0.18 80)";
    return "oklch(0.63 0.24 25)";
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <Clock
            className="w-5 h-5"
            style={{ color: "oklch(0.65 0.28 285)" }}
          />
          <h2 className="font-display text-2xl font-bold">Recent Analyses</h2>
        </motion.div>

        <div
          data-ocid="history.list"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {analyses.slice(0, 6).map((a, i) => {
            const score = Number(a.overallScore);
            const color = getScoreColor(score);
            const key = `analysis-${i}-${score}`;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => onSelect(a)}
                className="glass-card rounded-xl p-5 cursor-pointer hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted-foreground">
                    Analysis #{i + 1}
                  </span>
                  <div
                    className="font-display text-2xl font-bold"
                    style={{ color }}
                  >
                    {score}
                  </div>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5 mb-3">
                  <div
                    className="h-1.5 rounded-full transition-all duration-700"
                    style={{ width: `${score}%`, background: color }}
                  />
                </div>
                <div className="flex flex-wrap gap-1">
                  {a.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: "oklch(0.65 0.28 285 / 0.15)",
                        color: "oklch(0.78 0.22 285)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                  {a.skills.length > 3 && (
                    <span className="text-xs text-muted-foreground px-1">
                      +{a.skills.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                  <TrendingUp className="w-3 h-3" />
                  {Number(a.experienceYears)} yrs exp · {a.educationLevel}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
