import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserStore } from '../../../store/userStore';

const RegisterView: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(''); // For local messages (e.g., validation)

  // Selectors and actions from Zustand store
  const register = useUserStore((state) => state.register);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const isLoading = useUserStore((state) => state.isLoading);
  const error = useUserStore((state) => state.error); // Store error (e.g. user exists)
  const clearError = useUserStore((state) => () => state.error && useUserStore.setState({ error: null }));


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

    if (!username || !password || !confirmPassword) {
      setMessage('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    if (password.length < 6) { // Example: Basic password policy
        setMessage('Password must be at least 6 characters long.');
        return;
    }

    const result = await register(username, password);

    if (result.success) {
      setMessage(result.message); // "Registration successful."
      // Navigation is handled by useEffect watching isAuthenticated (since register logs in)
    } else {
      // If registration itself fails (e.g. user exists), message comes from result.message
      // If there was an unexpected error during hashing/saving, store.error might be set.
      // We prioritize result.message here.
      setMessage(result.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {/* Display local message (validation, success, or specific error from register action) */}
      {message && <p style={{ color: resultMessageIsError(message) ? 'red' : 'green' }}>{message}</p>}
      {/* Display global error from the store (e.g. unexpected hashing error), if not showing specific message */}
      {error && !message && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

// Helper function to determine message color (optional)
const resultMessageIsError = (message: string): boolean => {
    return message.toLowerCase().includes('fail') ||
           message.toLowerCase().includes('error') ||
           message.toLowerCase().includes('exists') ||
           message.toLowerCase().includes('match') ||
           message.toLowerCase().includes('fill in all fields');
};

export default RegisterView;
