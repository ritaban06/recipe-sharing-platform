// Import necessary dependencies from React and React Router
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import Firebase authentication functions and configuration
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

// Define the Login component, accepting setIsAuth as a prop
const Login = ({ setIsAuth }) => {
  // State hooks for form fields and error handling
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(''); // Clear any existing errors

    try {
      // Attempt to login user through custom API
      const response = await fetch('YOUR_API_ENDPOINT/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      // Parse the response
      const data = await response.json();
      console.log('Login successful:', data);
      
      // Store authentication token and set auth state
      localStorage.setItem('token', data.token);
      localStorage.setItem('isAuth', true);
      setIsAuth(true);
      
      // Redirect to home page
      navigate('/');
    } catch (err) {
      // Handle login errors
      setError('Invalid username or password. Please try again.');
      console.error('Login error:', err);
    }
  };

  // Handler for Google sign-in
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      // Set authentication state on successful Google sign-in
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    }).catch((error) => {
      // Handle Google sign-in errors
      setError('Google sign-in failed. Please try again.');
      console.error('Google sign-in error:', error);
    });
  };

  // Render the login form
  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Log In</h2>
        {error && <p className="text-red-500 dark:text-red-400 text-xs italic mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
            id="username"
            type="text"
            placeholder=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
            id="password"
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
            type="submit"
          >
            Log In
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
            onClick={signInWithGoogle}
          >
            Sign in with Google
          </button>
        </div>
      </form>
    </div>
  );
};

// Export the Login component
export default Login;