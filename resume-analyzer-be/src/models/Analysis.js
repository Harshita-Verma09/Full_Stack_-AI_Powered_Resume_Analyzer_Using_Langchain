import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema(
    {
        resumeFileName: {
            type: String,
            required: true,
            trim: true,
        },
        jobTitle: {
            type: String,
            default: 'Not specified',
            trim: true,
        },
        jobDescription: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },
        verdict: {
            type: String,
            enum: ['Excellent Match', 'Good Match', 'Partial Match', 'Weak Match'],
            required: true,
        },
        verdictReason: {
            type: String,
            default: '',
        },
        matchedSkills: {
            type: [String],
            default: [],
        },
        missingSkills: {
            type: [String],
            default: [],
        },
        improvements: {
            type: [String],
            default: [],
        },
        summary: {
            type: String,
            default: '',
        },
    },
    
    {
        timestamps: true, // adds createdAt and updatedAt automatically
    }
);

const Analysis = mongoose.model('Analysis', analysisSchema);

export default Analysis;