import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles, Target, Zap } from "lucide-react";
import { motion } from "motion/react";
import ParticleBackground from "./ParticleBackground";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Hero background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1920x1080.jpg')",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/70" />
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 mesh-gradient opacity-60" />
      {/* Particles */}
      <ParticleBackground />

      {/* Floating orbs */}
      <div
        className="absolute top-1/4 left-1/6 w-64 h-64 rounded-full float-animation"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.28 285 / 0.15), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/6 w-80 h-80 rounded-full float-animation"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.18 198 / 0.12), transparent 70%)",
          animationDelay: "-3s",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8 text-sm font-medium"
          style={{ color: "oklch(0.72 0.18 198)" }}
        >
          <Sparkles className="w-4 h-4" />
          AI-Powered Resume Intelligence
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
        >
          Analyze Your Resume{" "}
          <span className="gradient-text block">Instantly</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Get deep insights into your resume — skills detection, experience
          scoring, strength highlights, and actionable improvement suggestions
          in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button
            onClick={onGetStarted}
            size="lg"
            className="shimmer-button glow-button font-display text-base font-semibold px-10 py-6 rounded-xl"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.28 285), oklch(0.6 0.22 260))",
              color: "white",
            }}
          >
            <Zap className="w-5 h-5 mr-2" />
            Start Analyzing
          </Button>
          <span className="text-muted-foreground text-sm">
            Free · No signup required
          </span>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-3 gap-6 max-w-lg mx-auto"
        >
          {[
            { icon: Target, label: "Accuracy", value: "98%" },
            { icon: Zap, label: "Speed", value: "<2s" },
            { icon: Sparkles, label: "Insights", value: "20+" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="glass-card rounded-2xl p-4 text-center">
              <Icon
                className="w-5 h-5 mx-auto mb-2"
                style={{ color: "oklch(0.72 0.18 198)" }}
              />
              <div className="font-display text-2xl font-bold gradient-text">
                {value}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={onGetStarted}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.5,
            ease: "easeInOut",
          }}
          className="text-muted-foreground"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.div>
    </section>
  );
}
