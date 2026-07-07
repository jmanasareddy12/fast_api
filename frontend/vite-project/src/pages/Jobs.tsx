import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { ragSearch } from "../Services/RagService";
import { getJobs } from "../Services/JobService";
import type { Job } from "../types/job";

function Jobs(props: any) {
  const [jobs, setJobs] = useState<Job[]>(props.jobs || []);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setJobs(props.jobs);
  }, [props.jobs]);

  const handleSearch = async () => {
    setLoading(true);

    try {
      if (!query.trim()) {
        const allJobs = await getJobs();
        setJobs(allJobs);
        return;
      }

      const result = await ragSearch(query);

      const convertedJobs: Job[] = result.results.map((job: any) => ({
        id: job.job_id,
        title: job.title,
        salary: job.salary,
        description: job.description,
        company_id: 0,
      }));

      setJobs(convertedJobs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          margin: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Search jobs using AI..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "400px",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        
     
       
        <button onClick={handleSearch} disabled={loading}>
  {loading ? "Searching..." : "Search"}
</button>
        
 </div>
 {jobs.length === 0 && !loading && (
  <p style={{ textAlign: "center", marginTop: "20px" }}>
    No matching jobs found.
  </p>
)}
      <JobCard
        {...props}
        jobs={jobs}
      />
    </>
  );
}


export default Jobs;