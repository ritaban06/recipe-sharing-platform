import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Signup = ({ setIsAuth }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Firebase email/password signup
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // If you need to store additional user data (like username), you can use Firebase Realtime Database or Firestore here

      console.log('Signup successful:', user);
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate('/');
    } catch (err) {
      setError('Signup failed. ' + err.message);
      console.error('Signup error:', err);
    }
  };

  const signUpWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    }).catch((error) => {
      setError('Google sign-up failed. ' + error.message);
      console.error('Google sign-up error:', error);
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Sign Up</h2>
        {error && <p className="text-red-500 dark:text-red-400 text-xs italic mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700"
            id="email"
            type="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
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
            Sign Up
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
            onClick={signUpWithGoogle}
          >
            Sign up with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;