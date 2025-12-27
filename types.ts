
export enum TierLevel {
  EMERGING = 'Tier 1: Emerging',
  PROFICIENT = 'Tier 2: Proficient',
  ADVANCED = 'Tier 3: Advanced'
}

export interface StudentProfile {
  id: string;
  label: string; // e.g., "Student A"
  strengths: string;
  struggles: string;
  interests: string;
}

export interface LessonParams {
  topic: string;
  gradeLevel: string;
  learningGoal: string;
  smartTool: string;
  students: StudentProfile[];
}

export interface AIResponse {
  analysis: string;
  tiers: {
    emerging: string;
    proficient: string;
    advanced: string;
  };
  smartIntegration: string;
  socraticCheckpoint: string;
}
