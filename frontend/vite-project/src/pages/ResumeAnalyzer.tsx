import { useState } from "react";
import { analyseResume } from "../Services/RagService";
import "./ResumeAnalyzer.css";

function ResumeAnalyser() {
    const [resumeText, setResumeText] = useState("");
    const [analysis, setAnalysis] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAnalyse = async () => {
        if (!resumeText.trim()) return;
        setLoading(true);
        setAnalysis("");
        try {
            const result = await analyseResume(resumeText);
            // ResumeAnalysis may not have a property named `analysis` depending on implementation.
            // Safely extract a string to display: prefer result.analysis, otherwise use string result or JSON.
            const text = (result as any)?.analysis ?? (typeof result === "string" ? result : JSON.stringify(result));
            setAnalysis(text);
        } catch {
            setAnalysis("Failed to analyse resume. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="resume-analyzer-page">
            <h2>Resume Analyser</h2>
            <div className="resume-analyzer-form">
                <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your resume text here..."
                    rows={10}
                />
                <div className="resume-analyzer-buttons">
                    <button
                        onClick={handleAnalyse}
                        disabled={loading || !resumeText.trim()}
                    >
                        {loading ? "Analysing..." : "Analyse Resume"}
                    </button>
                </div>

                {analysis && (
                    <div className="resume-analysis-result">
                        <h3>Analysis Result</h3>
                        <p>{analysis}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ResumeAnalyser;