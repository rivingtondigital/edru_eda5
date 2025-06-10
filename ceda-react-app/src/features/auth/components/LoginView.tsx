import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserStore } from '../../../store/userStore';

const LoginView: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Selectors from Zustand store
  const login = useUserStore((state) => state.login);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const isLoading = useUserStore((state) => state.isLoading);
  const error = useUserStore((state) => state.error);
  const clearError = useUserStore((state) => () => state.error && useUserStore.setState({ error: null })); // Action to clear error

  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/');
    }
    // Clear previous errors when component mounts or isAuthenticated changes
    return () => {
      clearError();
    };
  }, [isAuthenticated, navigate, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(''); // Clear local message
    clearError();   // Clear store error

    if (!username || !password) {
      setMessage('Please enter username and password.');
      return;
    }
    const success = await login(username, password);
    if (success) {
      setMessage('Login successful!'); // Local message
      // Navigation is handled by useEffect watching isAuthenticated
    } else {
      // Error message will be set in the store by the login action
      // setMessage('Login failed. Check username or password.'); // This can be redundant if store error is shown
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {/* Display local message (e.g., for empty fields) */}
      {message && <p style={{ color: 'blue' }}>{message}</p>}
      {/* Display error from the store (e.g., for failed login attempt) */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginView;
