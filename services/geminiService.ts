import { GoogleGenAI, Type } from "@google/genai";
import { LessonParams, AIResponse } from "../types";

export const generatePersonalizedPath = async (params: LessonParams): Promise<AIResponse> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please ensure the environment variable is configured.");
  }

  // Initialize AI client inside the function call to ensure it uses the latest env state
  const ai = new GoogleGenAI({ apiKey });
  
  const studentDataStr = params.students
    .map(s => `${s.label}: Strengths(${s.strengths}), Struggles(${s.struggles}), Interests(${s.interests})`)
    .join("\n");

  const prompt = `
    Role: EduTech Nexus AI Orchestrator
    Objective: Create a personalized learning path and smart classroom integration.
    
    Topic: ${params.topic}
    Grade Level: ${params.gradeLevel}
    Learning Goal: ${params.learningGoal}
    Smart Tool Focus: ${params.smartTool}
    
    Student Profiles:
    ${studentDataStr}
    
    Strict Rules:
    1. Analyze the Zone of Proximal Development for these specific profiles.
    2. Differentiate into 3 Tiers (Emerging, Proficient, Advanced).
    3. Suggest one detailed Smart Tool activity using ${params.smartTool}.
    4. Provide one Socratic Checkpoint question.
    5. Use professional pedagogical language.
    6. Maintain student anonymity (e.g., Student A).
    7. Do not hallucinate facts.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          analysis: { type: Type.STRING, description: "ZPD Analysis for the classroom profiles" },
          tiers: {
            type: Type.OBJECT,
            properties: {
              emerging: { type: Type.STRING, description: "Content for Tier 1" },
              proficient: { type: Type.STRING, description: "Content for Tier 2" },
              advanced: { type: Type.STRING, description: "Content for Tier 3" }
            },
            required: ["emerging", "proficient", "advanced"]
          },
          smartIntegration: { type: Type.STRING, description: "Specific activity for the classroom tool" },
          socraticCheckpoint: { type: Type.STRING, description: "Critical thinking question" }
        },
        required: ["analysis", "tiers", "smartIntegration", "socraticCheckpoint"]
      }
    }
  });

  try {
    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text.trim()) as AIResponse;
  } catch (e) {
    console.error("Failed to parse AI response", e);
    throw new Error("The AI response was invalid. Please try again.");
  }
};