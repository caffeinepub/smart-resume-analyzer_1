import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Loader2, Upload, Wand2 } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

interface ResumeInputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

const SAMPLE_RESUME = `John Smith
john.smith@email.com | (555) 123-4567 | LinkedIn: linkedin.com/in/johnsmith
San Francisco, CA

SUMMARY
Senior Software Engineer with 8+ years of experience in full-stack development, cloud architecture, and team leadership. Passionate about building scalable distributed systems and mentoring junior developers.

EXPERIENCE
Senior Software Engineer — Google, Mountain View, CA (2020–Present)
• Designed and implemented microservices architecture serving 10M+ daily users
• Led a team of 6 engineers to deliver a real-time data pipeline reducing latency by 40%
• Technologies: Python, Go, Kubernetes, BigQuery, Pub/Sub

Software Engineer — Stripe, San Francisco, CA (2017–2020)
• Built payment processing APIs handling $5B+ in transactions
• Improved test coverage from 60% to 95%, reducing production incidents by 30%
• Technologies: Ruby, Java, React, PostgreSQL, Redis

EDUCATION
B.S. Computer Science — Stanford University (2013–2017)
GPA: 3.9/4.0 | Dean's List

SKILLS
Languages: Python, Go, Java, TypeScript, Ruby
Frameworks: React, Node.js, Django, Spring Boot
Cloud & DevOps: AWS, GCP, Kubernetes, Docker, Terraform, CI/CD
Databases: PostgreSQL, MySQL, Redis, BigQuery, MongoDB

CERTIFICATIONS
• AWS Solutions Architect Professional
• Google Cloud Professional Data Engineer`;

export default function ResumeInput({
  onAnalyze,
  isLoading,
}: ResumeInputProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleLoadSample = () => {
    setText(SAMPLE_RESUME);
    textareaRef.current?.focus();
  };

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <section id="analyze-section" className="relative py-24 px-6">
      {/* Background glow */}
      <div className="absolute inset-0 mesh-gradient opacity-40" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 text-sm font-medium mb-4 glass-card px-4 py-2 rounded-full"
            style={{ color: "oklch(0.65 0.28 285)" }}
          >
            <FileText className="w-4 h-4" />
            Paste Your Resume
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Smart Analysis</span> in Seconds
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Paste your resume text below and let our AI extract insights, detect
            skills, and provide targeted improvement recommendations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-card rounded-2xl p-6 md:p-8"
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-chart-3" />
              <span>{wordCount} words</span>
              <span className="opacity-50">·</span>
              <span>{charCount} characters</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLoadSample}
              className="text-xs gap-2"
              style={{ color: "oklch(0.72 0.18 198)" }}
            >
              <Upload className="w-3 h-3" />
              Load Sample Resume
            </Button>
          </div>

          <Textarea
            ref={textareaRef}
            data-ocid="resume.textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your full resume text here...\n\nTip: Include your work experience, education, skills, and certifications for the most comprehensive analysis."
            className="min-h-[320px] resize-y text-sm leading-relaxed font-body border-0 bg-transparent focus-visible:ring-1 p-0"
            style={
              {
                "--tw-ring-color": "oklch(0.65 0.28 285 / 0.5)",
              } as React.CSSProperties
            }
          />

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
            <div className="text-xs text-muted-foreground">
              {text.length > 0 ? (
                <span
                  style={{
                    color:
                      text.length > 200
                        ? "oklch(0.72 0.17 155)"
                        : "oklch(0.78 0.18 80)",
                  }}
                >
                  {text.length > 200
                    ? "✓ Sufficient length for analysis"
                    : "⚠ Add more content for better results"}
                </span>
              ) : (
                "Enter at least 200 characters"
              )}
            </div>
            <Button
              data-ocid="resume.submit_button"
              onClick={() => onAnalyze(text)}
              disabled={isLoading || text.trim().length < 50}
              size="lg"
              className="shimmer-button glow-button font-display font-semibold px-8 gap-2"
              style={{
                background:
                  isLoading || text.trim().length < 50
                    ? undefined
                    : "linear-gradient(135deg, oklch(0.55 0.28 285), oklch(0.6 0.22 260))",
                color: "white",
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Analyzing...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" /> Analyze Resume
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
