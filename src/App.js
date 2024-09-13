import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, PlusCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import RecipeList from './components/RecipeList'; // Added import statement for RecipeList.js

// Placeholder components
const Home = () => (
  <div className="max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold mb-4">Welcome to Open Recipe Sharing</h1>
    <p className="text-lg">Discover, share, and enjoy delicious recipes from around the world!</p>
  </div>
);

// const RecipeList = () => (
//   <div className="max-w-4xl mx-auto">
//     <h2 className="text-2xl font-bold mb-4">Recipe List</h2>
//     {/* Add recipe list items here */}
//   </div>
// );         // Lines 14 to 19 not needed as import statement (line 4) has done it already

const RecipeSubmission = () => (
  <div className="max-w-4xl mx-auto">
    <h2 className="text-2xl font-bold mb-4">Submit a Recipe</h2>
    {/* Add recipe submission form here */}
  </div>
);

const Search = () => (
  <div className="max-w-4xl mx-auto">
    <h2 className="text-2xl font-bold mb-4">Search Recipes</h2>
    {/* Add search functionality here */}
  </div>
);

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <BookOpenIcon className="h-8 w-8 text-blue-500" />
                  <span className="text-xl font-semibold ml-2">Recipe Share</span>
                </Link>
                <div className="ml-6 flex space-x-8">
                  <Link to="/" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">
                    <HomeIcon className="h-5 w-5 mr-1" />
                    Home
                  </Link>
                  <Link to="/recipes" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">
                    <BookOpenIcon className="h-5 w-5 mr-1" />
                    Recipes
                  </Link>
                  <Link to="/submit" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">
                    <PlusCircleIcon className="h-5 w-5 mr-1" />
                    Submit Recipe
                  </Link>
                  <Link to="/search" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">
                    <MagnifyingGlassIcon className="h-5 w-5 mr-1" />
                    Search
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content area - flex-1 to take remaining space */}
        <main className="flex-1 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/submit" element={<RecipeSubmission />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>

        {/* Footer stays at the bottom */}
        <footer className="bg-white border-t border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
            <p>&copy; 2024 Open Recipe Sharing Platform</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
