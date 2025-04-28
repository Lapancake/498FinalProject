import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
var host = "http://localhost:3000";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Attempting to log in with:", { username, password });

    try {
      const response = await fetch(host + '/shop/login', {  // ✅ THIS MUST EXIST
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json(); // ✅ Get JSON
      console.log("Login response data:", data);  // ✅ See exactly what server sends

      if (response.ok) {
        sessionStorage.setItem('logged', '1');
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('isAdmin', data.user.isadmin ? '1' : '0');
        sessionStorage.setItem('userId', data.user.userid); // ✅ Use lowercase 'userid'

        navigate('/');
        window.location.reload();
      } else {
        console.warn("Login failed:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Server error. Please try again later.');
    }
  };
//jjafksfkljsl;fkjslkfj
  return (
    <div className="bg-gray-50 font-sans">
      {/* Main Section */}
      <main className="py-24">
        <section className="container mx-auto bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-4xl font-bold text-center mb-8">Login to Your Account</h2>
          
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="username" className="block text-lg font-medium">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-lg font-medium">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 shadow-lg">
              Login
            </button>
          </form>

          <p className="text-center mt-4">
            Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Create one here</Link>.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 PC Parts Togo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
