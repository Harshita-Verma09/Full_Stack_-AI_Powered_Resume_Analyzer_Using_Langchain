//resume-analyzer-be/src/services/pdfService.js
import pdf from "pdf-parse/lib/pdf-parse.js";

/**
 * Extract plain text from PDF buffer
 */
export const extractTextFromPDF = async (buffer) => {
    try {
        const data = await pdf(buffer);

        const text = data.text?.trim();

        if (!text || text.length < 50) {
            throw new Error(
                "PDF text could not be extracted. Make sure PDF is text-based."
            );
        }

        return text.slice(0, 4000);

    } catch (err) {
        throw new Error("PDF parsing failed: " + err.message);
    }
};