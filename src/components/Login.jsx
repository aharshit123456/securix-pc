import React, { useState } from 'react';
import { supabase } from '../supabaseClient.jsx'; // Adjust path if needed
import '../styles.css'
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleAuth = async () => {
    const authFunction = isSignUp ? supabase.auth.signUp : supabase.auth.signInWithPassword;
    const { error } = await authFunction({ email, password });

    if (error) {
      setErrorMessage(error.message);
    } else {
      onLogin(); // Trigger login callback after successful auth
    }
  };

  return (
    <div className="login-container">
      <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="input-field"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="input-field"
      />
      <button onClick={handleAuth} className="auth-button">
        {isSignUp ? 'Sign Up' : 'Log In'}
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p className="switch-mode" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Log In' : 'Don’t have an account? Sign Up'}
      </p>
    </div>
  );
};

export default Login;
