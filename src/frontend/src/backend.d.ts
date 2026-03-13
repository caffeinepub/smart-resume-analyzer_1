import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ResumeAnalysis {
    suggestions: Array<string>;
    overallScore: bigint;
    strengths: Array<string>;
    wordCount: bigint;
    experienceYears: bigint;
    skills: Array<string>;
    educationLevel: string;
}
export interface backendInterface {
    analyzeResume(sessionId: string, resumeText: string): Promise<ResumeAnalysis>;
    getRecentAnalyses(sessionId: string): Promise<Array<ResumeAnalysis>>;
}
