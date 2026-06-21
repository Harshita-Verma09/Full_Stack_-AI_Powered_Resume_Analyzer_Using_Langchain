
///home/harshita-verma/Documents/JS+LLM/1. Resume_Analyse_chain/resume-analyzer-be/src/services/langchainService.js
import dotenv from "dotenv";
dotenv.config();

import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export const analyzeResumeWithLangChain = async (resumeText, jobDesc, jobTitle) => {
    try {
        if (!process.env.GROQ_API_KEY) {
            throw new Error("GROQ_API_KEY is missing in your .env file!");
        }

        const model = new ChatGroq({
            model: "llama-3.1-8b-instant",
            apiKey: process.env.GROQ_API_KEY,
            maxTokens: 1000,
            temperature: 0.1,
        });

        const prompt = ChatPromptTemplate.fromMessages([
            [
                "system",
                `You are a professional resume analyzer. 
Return ONLY a single valid JSON object. No explanation, no markdown, no extra text.
The JSON must have exactly these fields:
- matchScore: number (0-100)
- matchedSkills: array of strings   
- missingSkills: array of strings
- improvements: array of strings
- finalSummary: string`
            ],
            [
                "user",
                `Analyze this resume against the job description.

Job Title: {jobTitle}
Job Description: {jobDesc}
Resume: {resumeText}

Return ONLY JSON. Nothing else.`
            ]
        ]);

        const chain = prompt.pipe(model);

        const response = await chain.invoke({ jobTitle, jobDesc, resumeText });

        // const rawText = response.content;
        const rawText =
            typeof response.content === "string"
                ? response.content
                : JSON.stringify(response.content);
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("No JSON found in model response");
        }

        const result = JSON.parse(jsonMatch[0]);

        // ✅ matchedSkills validation add kiya
        if (
            typeof result.matchScore !== "number" ||
            !Array.isArray(result.matchedSkills) ||
            !Array.isArray(result.missingSkills) ||
            !Array.isArray(result.improvements) ||
            typeof result.finalSummary !== "string"
        ) {
            throw new Error("Invalid JSON structure from model");
        }

        return result;

    } catch (err) {
        console.error("LANGCHAIN ERROR =>", err);
        throw new Error("AI Parsing Failed with LangChain: " + err.message);
    }
};