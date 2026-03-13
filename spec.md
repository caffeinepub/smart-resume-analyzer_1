# Smart Resume Analyzer

## Current State
New project — no existing code.

## Requested Changes (Diff)

### Add
- Resume text input (paste or type resume content)
- AI-style analysis engine that parses the resume and extracts:
  - Contact info detection
  - Skills list (technical + soft skills)
  - Work experience summary (years, roles)
  - Education level detection
  - Overall resume score (0–100)
  - Strengths identified
  - Improvement suggestions
- Animated results dashboard with score ring, skill badges, and feedback cards
- Attractive landing hero section with animated gradient background
- Smooth section transitions and entrance animations

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend: Motoko actor with `analyzeResume(text: Text)` returning structured analysis result (score, skills, experience years, education, strengths, suggestions)
2. Frontend: Hero section with gradient animation, resume input textarea, animated score ring, skills badges grid, strengths/suggestions cards, all with entrance animations
