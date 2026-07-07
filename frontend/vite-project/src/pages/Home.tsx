import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to TalentSpark </h1>
        <p>
          Career Guidance, Resume Analysis and Job Recommendation
          Platform.
        </p>
      </div>

      <div className="dashboard-grid">
        <Link to="/companies" className="dashboard-card">
          <h2>🏢 Companies</h2>
          <p>Manage all companies</p>
        </Link>

        <Link to="/jobs" className="dashboard-card">
          <h2>💼 Jobs</h2>
          <p>Browse job openings</p>
        </Link>

        <Link to="/chat" className="dashboard-card">
          <h2>🤖 Career Chat</h2>
          <p>Talk with AI</p>
        </Link>

        <Link to="/resume" className="dashboard-card">
          <h2>📄 Resume Analyzer</h2>
          <p>Improve your resume</p>
        </Link>

        <Link to="/job-match" className="dashboard-card">
          <h2>🎯 Job Match</h2>
          <p>Find matching jobs</p>
        </Link>

        

        
      </div>
    </div>
  );
}

export default Home;