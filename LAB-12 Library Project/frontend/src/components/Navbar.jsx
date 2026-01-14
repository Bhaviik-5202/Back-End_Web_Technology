import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.brand}>
        <span style={styles.logo}>📘</span>
        <span style={styles.title}>DU Library</span>
      </div>

      <div style={styles.links}>
        <NavLink to="/" style={navLink} end>
          Home
        </NavLink>
        <NavLink to="/search" style={navLink}>
          Search
        </NavLink>
        <NavLink to="/add" style={navLink}>
          Add
        </NavLink>
        <NavLink to="/delete" style={navLink}>
          Delete
        </NavLink>
      </div>
    </nav>
  );
}

const navLink = ({ isActive }) => ({
  padding: "10px 16px",
  borderRadius: "6px",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: "600",
  color: isActive ? "#2563eb" : "#4b5563",
  backgroundColor: isActive ? "#dbeafe" : "transparent",
  transition: "all 0.2s",
  border: "1px solid transparent",
  "&:hover": {
    backgroundColor: "#f3f4f6",
    borderColor: "#e5e7eb",
  },
});

const styles = {
  navbar: {
    height: "70px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 32px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  logo: {
    fontSize: "24px",
  },

  title: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#2563eb",
  },

  links: {
    display: "flex",
    gap: "8px",
  },
};
