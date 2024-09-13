import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, PlusCircleIcon, MagnifyingGlassIcon, XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import RecipeList from './components/RecipeList';
import RecipeSubmission from './components/RecipeSubmission';
import Search from './components/Search';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import RecipeDetail from './components/RecipeDetail';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <nav className="bg-white dark:bg-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <Link to="/" className="flex-shrink-0 flex items-center">
                    <BookOpenIcon className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                    <span className="text-xl font-semibold ml-2 text-gray-900 dark:text-white">Recipe Share</span>
                  </Link>
                </div>
                
                {/* Mobile menu button and theme toggle */}
                <div className="flex items-center sm:hidden">
                  <ThemeToggle />
                  <button
                    onClick={toggleMenu}
                    className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  >
                    <span className="sr-only">Open main menu</span>
                    {isMenuOpen ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </button>
                </div>

                {/* Desktop menu */}
                <div className="hidden sm:flex sm:items-center sm:ml-6 sm:space-x-8">
                  <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                    <HomeIcon className="h-5 w-5 mr-1" />
                    Home
                  </Link>
                  <Link to="/recipes" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                    <BookOpenIcon className="h-5 w-5 mr-1" />
                    Recipes
                  </Link>
                  <Link to="/submit" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                    <PlusCircleIcon className="h-5 w-5 mr-1" />
                    Submit Recipe
                  </Link>
                  <Link to="/search" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                    <MagnifyingGlassIcon className="h-5 w-5 mr-1" />
                    Search
                  </Link>
                  <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded mr-2">
                    Sign Up
                  </Link>
                  <Link to="/login" className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded">
                    Log In
                  </Link>
                  <ThemeToggle />
                </div>
              </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
              <div className="pt-2 pb-3 space-y-1">
                <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 text-base font-medium">
                  <HomeIcon className="h-5 w-5 inline mr-1" />
                  Home
                </Link>
                <Link to="/recipes" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 text-base font-medium">
                  <BookOpenIcon className="h-5 w-5 inline mr-1" />
                  Recipes
                </Link>
                <Link to="/submit" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 text-base font-medium">
                  <PlusCircleIcon className="h-5 w-5 inline mr-1" />
                  Submit Recipe
                </Link>
                <Link to="/search" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 text-base font-medium">
                  <MagnifyingGlassIcon className="h-5 w-5 inline mr-1" />
                  Search
                </Link>
                <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded block mx-3 my-2">
                  Sign Up
                </Link>
                <Link to="/login" className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded block mx-3 my-2">
                  Log In
                </Link>
              </div>
            </div>
          </nav>

          {/* Main content area */}
          <main className="flex-1 py-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<RecipeList />} />
              <Route path="/submit" element={<RecipeSubmission />} />
              <Route path="/search" element={<Search />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/recipes/:id" element={<RecipeDetail />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
              <p>&copy; 2024 CodeQuad</p>
            </div>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;