import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("logged") === "1";
  const isAdmin = sessionStorage.getItem("isAdmin") === "1";
  const username = sessionStorage.getItem("username");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav style={navStyle}>
      <div style={linkContainerStyle}>
        <Link to="/" style={linkStyle}>Home</Link>

        {isLoggedIn && (
          <>
            <Link to="/sellPart" style={linkStyle}>Sell Part</Link>
            <Link to="/my-account" style={linkStyle}>My Account</Link>
            {isAdmin && <Link to="/admin" style={linkStyle}>Admin Panel</Link>}
            <span style={{ ...linkStyle, fontWeight: 'bold', color: '#ffffffaa' }}>
              Hello, {username}
            </span>
            <button
              onClick={handleLogout}
              style={{ ...linkStyle, backgroundColor: '#ff4444', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
            >
              Logout
            </button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const navStyle = {
  backgroundColor: '#3AEE40',
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
