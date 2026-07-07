import { Link } from "react-router-dom";
import "./NavBar.css";

interface NavBarProps {
  onLogout: () => void;
}

function NavBar({ onLogout }: NavBarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>TalentSpark</h2>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/companies">Companies</Link>
        </li>

        <li>
          <Link to="/jobs">Jobs</Link>
        </li>

        <li>
          <Link to="/chat">Chat</Link>
        </li>
      </ul>

      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </nav>
  );
}

export default NavBar;