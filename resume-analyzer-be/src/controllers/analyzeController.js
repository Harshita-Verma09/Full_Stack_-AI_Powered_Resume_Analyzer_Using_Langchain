// // /home/harshita-verma/Documents/JS+LLM/Resume_Analyse/resume-analyzer-be/src/controllers/analyzeController.js

import { extractTextFromPDF } from '../services/pdfService.js';
import { analyzeResumeWithLangChain } from '../services/langchainService.js';

export const analyzeResume = async (req, res, next) => {
    console.log("CONTROLLER HIT");

    try {
        const resumeText = await extractTextFromPDF(req.file.buffer);
        console.log("PDF EXTRACTED");

        const aiResult = await analyzeResumeWithLangChain(
            resumeText,
            req.body.jobDescription,
            req.body.jobTitle
        );

        console.log("AI RESPONSE =>", aiResult);

        // Agar Langchain se kisi wajah se string aayi ho toh use parse kar lo
        let parsedResult = aiResult;
        if (typeof aiResult === 'string') {
            parsedResult = JSON.parse(aiResult);
        }

        // 🔴 CRITICAL FIX: Frontend ko direct object bhejenge taaki asani ho
        res.status(200).json(parsedResult);

    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const getHistory = async (req, res) => { res.json([]); };
export const getAnalysis = async (req, res) => { res.json([]); };