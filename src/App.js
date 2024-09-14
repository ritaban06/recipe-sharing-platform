import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, PlusCircleIcon, MagnifyingGlassIcon, XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import RecipeList from './components/RecipeList';
import RecipeSubmission from './components/RecipeSubmission';
import Search from './components/Search';
import Home from './components/Home';
import Login from './components/Login';
import RecipeDetail from './components/RecipeDetail';
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

const NavBar = ({ isAuth, setIsAuth }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/login");
    });
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <BookOpenIcon className="h-8 w-8 text-blue-500 dark:text-blue-400" />
              <span className="text-xl font-semibold ml-2 text-gray-900 dark:text-white">Recipe Share</span>
            </Link>
          </div>
          
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

          <div className="hidden sm:flex sm:items-center sm:ml-6 sm:space-x-8">
            <NavLink to="/" icon={<HomeIcon className="h-5 w-5 mr-1" />} text="Home" />
            <NavLink to="/recipes" icon={<BookOpenIcon className="h-5 w-5 mr-1" />} text="Recipes" />
            {isAuth && <NavLink to="/submit" icon={<PlusCircleIcon className="h-5 w-5 mr-1" />} text="Submit Recipe" />}
            <NavLink to="/search" icon={<MagnifyingGlassIcon className="h-5 w-5 mr-1" />} text="Search" />
            {!isAuth ? (
              <Link to="/login" className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded">
                Log In
              </Link>
            ) : (
              <button onClick={signUserOut} className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded">
                Log Out
              </button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          <MobileNavLink to="/" icon={<HomeIcon className="h-5 w-5 inline mr-1" />} text="Home" />
          <MobileNavLink to="/recipes" icon={<BookOpenIcon className="h-5 w-5 inline mr-1" />} text="Recipes" />
          {isAuth && <MobileNavLink to="/submit" icon={<PlusCircleIcon className="h-5 w-5 inline mr-1" />} text="Submit Recipe" />}
          <MobileNavLink to="/search" icon={<MagnifyingGlassIcon className="h-5 w-5 inline mr-1" />} text="Search" />
          {!isAuth ? (
            <Link to="/login" className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded block mx-3 my-2">
              Log In
            </Link>
          ) : (
            <button onClick={signUserOut} className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded block mx-3 my-2">
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, text }) => (
  <Link to={to} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white inline-flex items-center px-1 pt-1 text-sm font-medium">
    {icon}
    {text}
  </Link>
);

const MobileNavLink = ({ to, icon, text }) => (
  <Link to={to} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 text-base font-medium">
    {icon}
    {text}
  </Link>
);

const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") === "true");

  useEffect(() => {
    localStorage.setItem("isAuth", isAuth);
  }, [isAuth]);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <NavBar isAuth={isAuth} setIsAuth={setIsAuth} />

          <main className="flex-1 py-10">
            <Routes>
              <Route path="/" element={<Home isAuth={isAuth} />} />
              <Route path="/recipes" element={<RecipeList />} />
              <Route path="/submit" element={<RecipeSubmission isAuth={isAuth} />} />
              <Route path="/search" element={<Search />} />
              <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
              <Route path="/recipes/:id" element={<RecipeDetail />} />
            </Routes>
          </main>

          <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
              <p>&copy; 2024 CodeQuad</p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;