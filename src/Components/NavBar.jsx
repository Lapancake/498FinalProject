import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={navStyle}>
      <div style={linkContainerStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/about" style={linkStyle}>About</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/register" style={linkStyle}>Register</Link>
      </div>
    </nav>
  );
}

const navStyle = {
  backgroundColor: '#4ae24f',
  width: '200px',
  height: '100vh',
  padding: '20px 10px',
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
};

const linkContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  marginBottom: '15px',
  fontSize: '16px'
};

export default Navbar;