import api from "./api";
// Local type fallbacks to avoid import resolution issues for ../types/rag
// (kept minimal — adjust fields as needed to match your project's types)
export type ResumeAnalysis = {
    score?: number;
    summary?: string;
    details?: Record<string, any>;
};

export type RagAnswer = {
    answer: string;
    source?: string;
    confidence?: number;
};

export type EmbedResult = {
    inserted?: number;
    failed?: number;
};

export type JobMatchResponse = {
    matches: {
        job_id: number;
        title: string;
        description: string;
        salary: number;
        match_score: number;
    }[];
};

export type SemanticSearchResponse = {
    results: Array<{ id: string; score: number; snippet?: string }>;
};

export async function embedJobs(): Promise<EmbedResult> {
    const response = await api.post<EmbedResult>("/rag/embed-jobs");
    return response.data;
}

export async function ragSearch(query: string): Promise<SemanticSearchResponse> {
    const response = await api.post<SemanticSearchResponse>("/rag/search", { query });
    return response.data;
}

export async function ragAsk(question: string): Promise<RagAnswer> {
    const response = await api.post<RagAnswer>("/rag/ask", { question });
    return response.data;
}

export async function analyseResume(resume_text: string): Promise<ResumeAnalysis> {
    const response = await api.post<ResumeAnalysis>("/rag/analyse-resume", { resume_text });
    return response.data;
}

export async function jobMatch(
    skills: string,
    experience: string
): Promise<JobMatchResponse> {
    const response = await api.post<JobMatchResponse>(
        "/rag/job-match",
        { skills, experience }
    );

    return response.data;
}