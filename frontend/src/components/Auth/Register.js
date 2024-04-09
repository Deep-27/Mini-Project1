import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/register', { email, password });
      // Redirect user to login page after successful registration
      // Example: history.push('/login');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
