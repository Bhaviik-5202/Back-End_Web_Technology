import { NavLink } from "react-router-dom";

export default function Header() {
  const linkStyle = ({ isActive }) => ({
    padding: "12px 22px",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "600",
    color: isActive ? "#2563eb" : "#374151",
    borderBottom: isActive ? "3px solid #2563eb" : "3px solid transparent",
    transition: "all 0.2s ease",
  });

  return (
    <header style={styles.header}>
      <div style={styles.logoSection}>
        <span style={styles.logo}>📚</span>
        <h1 style={styles.title}>BookManager</h1>
      </div>

      <nav style={styles.nav}>
        <NavLink to="/" style={linkStyle}>
          Home
        </NavLink>
        <NavLink to="/search" style={linkStyle}>
          Search
        </NavLink>
        <NavLink to="/add" style={linkStyle}>
          Add Book
        </NavLink>
        <NavLink to="/delete" style={linkStyle}>
          Delete
        </NavLink>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    width: "100%",
    height: "70px",
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 40px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
  },

  logoSection: {
    display: "flex",
    alignItems: "center",
  },

  logo: {
    fontSize: "28px",
    marginRight: "10px",
  },

  title: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#2563eb",
    letterSpacing: "0.5px",
  },

  nav: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
};
