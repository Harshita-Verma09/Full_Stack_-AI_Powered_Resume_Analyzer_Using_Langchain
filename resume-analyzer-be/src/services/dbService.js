import Analysis from '../models/Analysis.js';

/**
 * Save a new analysis result to MongoDB
 */
export const saveAnalysis = async ({
    resumeFileName,
    jobDescription,
    jobTitle,
    score,
    verdict,
    verdictReason,
    matchedSkills,
    missingSkills,
    improvements,
    summary,
}) => {
    const analysis = new Analysis({
        resumeFileName,
        jobDescription,
        jobTitle: jobTitle || 'Not specified',
        score,
        verdict,
        verdictReason,
        matchedSkills,
        missingSkills,
        improvements,
        summary,
    });

    await analysis.save();
    return analysis;
};

/**
 * Get all past analyses (latest first)
 */
export const getAllAnalyses = async (limit = 10) => {
    return await Analysis.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .select('-jobDescription'); // don't return full JD in list
};

/**
 * Get a single analysis by ID
 */
export const getAnalysisById = async (id) => {
    return await Analysis.findById(id);
};

// Tumhara system hai:

// LangChain + LLM API based resume analyzer

// Simple words:

// LLM (AI model) → analysis kar raha hai
// LangChain → request/response ko organize kar raha hai
// Backend → data save kar raha hai