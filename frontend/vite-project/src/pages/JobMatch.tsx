import { useState } from "react";
import {
  jobMatch,
  embedJobs,
  ragSearch,
} from "../Services/RagService";
import type { SemanticSearchResult } from "../types/rag";
import "./JobMatch.css";

interface JobMatchResult {
  job_id: number;
  title: string;
  description: string;
  salary: number;
  match_score: number;
}

function JobMatch() {
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [matches, setMatches] = useState<JobMatchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SemanticSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [embedMsg, setEmbedMsg] = useState("");

  const handleEmbed = async () => {
    setLoading(true);
    setEmbedMsg("");

    try {
      const result = await embedJobs();
      setEmbedMsg(
        (result as any).message ??
        (result as any).status ??
        "Jobs embedded successfully."
      );
    } catch {
      setEmbedMsg("Failed to embed jobs. Is Qdrant running?");
    } finally {
      setLoading(false);
    }
  };

  const handleMatch = async () => {
    if (!skills.trim()) return;

    setLoading(true);
    setMatches([]);

    try {
      const result = await jobMatch(skills, experience);

      // Backend already returns the correct structure
      setMatches(result.matches);
    } catch {
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setSearchResults([]);

    try {
      const result = await ragSearch(searchQuery);

      const normalized: SemanticSearchResult[] = result.results.map((r: any) => ({
        job_id: r.job_id,
        title: r.title,
        description: r.description,
        salary: r.salary,
        score: r.score,
      }));

      setSearchResults(normalized);
    } catch {
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="jobmatch-container">
      <h2>Smart Job Match</h2>

      <div className="jobmatch-section">
        <h3>Step 1: Embed Jobs into Vector DB</h3>
        <p>Click below to embed all jobs from the database into Qdrant for semantic search.</p>
        <button onClick={handleEmbed} disabled={loading}>
          {loading ? "Embedding..." : "Embed All Jobs"}
        </button>
        {embedMsg && <p className="jobmatch-message">{embedMsg}</p>}
      </div>

      <div className="jobmatch-section">
        <h3>Step 2: Semantic Job Search</h3>
        <div className="jobmatch-input-group">
          <input
            type="text"
            className="jobmatch-full-width"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search jobs... e.g. 'python backend developer'"
          />
          <button onClick={handleSearch} disabled={loading || !searchQuery.trim()}>
            Search
          </button>
        </div>
        {searchResults.length > 0 && (
          <div className="jobmatch-results">
            {searchResults.map((r, i) => (
              <div key={i} className="jobmatch-item">
                <strong>{r.title}</strong> — Score: {r.score}
                <p>{r.description}</p>
                <small>Salary: {r.salary}</small>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="jobmatch-section">
        <h3>Step 3: Match Your Profile</h3>
        <input
          type="text"
          className="jobmatch-full-width"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Your skills... e.g. 'Python, React, SQL'"
        />
        <input
          type="text"
          className="jobmatch-full-width"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="Your experience... e.g. '3 years in web development'"
          style={{ marginTop: "var(--spacing-md)" }}
        />
        <button onClick={handleMatch} disabled={loading || !skills.trim()} style={{ marginTop: "var(--spacing-lg)" }}>
          {loading ? "Matching..." : "Find Matching Jobs"}
        </button>
        {matches.length > 0 && (
          <div className="jobmatch-results">
            <h4>Top Matches</h4>
            {matches.map((m, i) => (
              <div key={i} className="jobmatch-item">
                <strong>{m.title}</strong> — Match: {m.match_score}%
                <p>{m.description}</p>
                <small>Salary: {m.salary}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobMatch;