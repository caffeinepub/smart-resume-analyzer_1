import { Toaster } from "@/components/ui/sonner";
import { Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { ResumeAnalysis } from "./backend.d";
import HeroSection from "./components/HeroSection";
import HistorySection from "./components/HistorySection";
import ResultsDashboard from "./components/ResultsDashboard";
import ResumeInput from "./components/ResumeInput";
import { useAnalyzeResume, useGetRecentAnalyses } from "./hooks/useQueries";

export default function App() {
  const analyzeSection = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [currentResult, setCurrentResult] = useState<ResumeAnalysis | null>(
    null,
  );

  const { mutate: analyzeResume, isPending } = useAnalyzeResume();
  const { data: recentAnalyses = [] } = useGetRecentAnalyses();

  const scrollToAnalyze = () => {
    analyzeSection.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleAnalyze = (text: string) => {
    analyzeResume(text, {
      onSuccess: (result) => {
        setCurrentResult(result);
        toast.success("Analysis complete!", {
          description: `Score: ${Number(result.overallScore)}/100`,
        });
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 300);
      },
      onError: (err) => {
        toast.error("Analysis failed", { description: err.message });
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "oklch(0.14 0.028 275)",
            border: "1px solid oklch(0.65 0.28 285 / 0.3)",
            color: "oklch(0.94 0.012 275)",
          },
        }}
      />

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <nav className="max-w-6xl mx-auto flex items-center justify-between glass-card rounded-2xl px-6 py-3">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.28 285), oklch(0.72 0.18 198))",
              }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg gradient-text">
              ResumeAI
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <button
              type="button"
              data-ocid="nav.link"
              onClick={scrollToAnalyze}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Analyze
            </button>
            {recentAnalyses.length > 0 && (
              <button
                type="button"
                data-ocid="nav.link"
                onClick={() =>
                  document
                    .getElementById("history-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                History
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <HeroSection onGetStarted={scrollToAnalyze} />

      {/* Input Section */}
      <div ref={analyzeSection}>
        <ResumeInput onAnalyze={handleAnalyze} isLoading={isPending} />
      </div>

      {/* Results */}
      <AnimatePresence>
        {currentResult && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ResultsDashboard result={currentResult} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading state */}
      {isPending && (
        <div
          data-ocid="results.loading_state"
          className="py-20 flex flex-col items-center justify-center gap-4"
        >
          <div
            className="w-16 h-16 rounded-full border-2 border-transparent animate-spin"
            style={{
              borderTopColor: "oklch(0.65 0.28 285)",
              borderRightColor: "oklch(0.72 0.18 198)",
            }}
          />
          <p className="text-muted-foreground font-medium animate-pulse">
            Analyzing your resume...
          </p>
        </div>
      )}

      {/* History */}
      {recentAnalyses.length > 0 && (
        <div id="history-section">
          <HistorySection
            analyses={recentAnalyses}
            onSelect={setCurrentResult}
          />
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border mt-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.28 285), oklch(0.72 0.18 198))",
              }}
            >
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-display font-bold gradient-text">
              ResumeAI
            </span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
