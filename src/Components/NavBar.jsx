import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ backgroundColor: '#4A90E2', padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/about" style={linkStyle}>About</Link>
          <Link to="/contact" style={{ ...linkStyle, marginRight: '20px' }}>Contact</Link>
        </div>
        <div>
          <Link to="/login" style={linkStyle}>Login</Link>
          <Link to="/register" style={linkStyle}>Register</Link>
        </div>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: 'white',
  marginRight: '20px',
  textDecoration: 'none'
};

export default Navbar;