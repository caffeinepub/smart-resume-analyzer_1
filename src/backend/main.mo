import Array "mo:core/Array";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";

actor {
  type ResumeAnalysis = {
    overallScore : Nat;
    skills : [Text];
    experienceYears : Nat;
    educationLevel : Text;
    strengths : [Text];
    suggestions : [Text];
    wordCount : Nat;
  };

  let historyMap = Map.empty<Text, [ResumeAnalysis]>();
  let maxHistorySize = 10;

  public shared ({ caller }) func analyzeResume(sessionId : Text, resumeText : Text) : async ResumeAnalysis {
    let analysis : ResumeAnalysis = {
      overallScore = 85;
      skills = ["Communication", "Project Management"];
      experienceYears = 3;
      educationLevel = "Bachelor's";
      strengths = ["Strong communication", "Technical skills"];
      suggestions = ["Add more quantifiable achievements", "Improve formatting"];
      wordCount = resumeText.size();
    };

    let currentHistory = switch (historyMap.get(sessionId)) {
      case (null) { [] };
      case (?existingArray) { existingArray };
    };

    let newHistory = [analysis].concat(currentHistory);

    let trimmedHistory = if (newHistory.size() > maxHistorySize) {
      newHistory.sliceToArray(0, maxHistorySize);
    } else {
      newHistory;
    };

    historyMap.add(sessionId, trimmedHistory);
    analysis;
  };

  public query ({ caller }) func getRecentAnalyses(sessionId : Text) : async [ResumeAnalysis] {
    switch (historyMap.get(sessionId)) {
      case (null) { [] };
      case (?array) { array };
    };
  };
};
