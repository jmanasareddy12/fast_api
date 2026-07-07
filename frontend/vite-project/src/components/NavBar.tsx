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
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Companies</a>
        </li>
        <li>
          <a href="#">Jobs</a>
        </li>
        <li>
          <a href="#">Chat</a>
        </li>
      </ul>

      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </nav>
  );
}

export default NavBar;