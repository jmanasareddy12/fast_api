import { useState } from "react";
import { analyseResume } from "../Services/RagService";

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
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <h2>Resume Analyser</h2>
            <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text here..."
                rows={10}
                style={{ width: "100%", padding: "10px", fontSize: "14px", resize: "vertical" }}
            />
            <br />
            <button
                onClick={handleAnalyse}
                disabled={loading || !resumeText.trim()}
                style={{ marginTop: "10px", padding: "8px 20px" }}
            >
                {loading ? "Analysing..." : "Analyse Resume"}
            </button>

            {analysis && (
                <div style={{ marginTop: "20px", textAlign: "left", whiteSpace: "pre-wrap", border: "1px solid #ccc", padding: "15px", borderRadius: "5px" }}>
                    <h3>Analysis Result</h3>
                    <p>{analysis}</p>
                </div>
            )}
        </div>
    );
}

export default ResumeAnalyser;