import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ResumeAnalysis } from "../backend.d";
import { useActor } from "./useActor";

const SESSION_KEY = "resume_session_id";

export function getSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `session_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function useGetRecentAnalyses() {
  const { actor, isFetching } = useActor();
  return useQuery<ResumeAnalysis[]>({
    queryKey: ["recentAnalyses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecentAnalyses(getSessionId());
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useAnalyzeResume() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<ResumeAnalysis, Error, string>({
    mutationFn: async (resumeText: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.analyzeResume(getSessionId(), resumeText);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recentAnalyses"] });
    },
  });
}
