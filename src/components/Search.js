import React, { useState } from 'react';

const RecipeCard = ({ meal, onClick }) => (
  <div 
    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
    onClick={() => onClick(meal.idMeal)}
  >
    <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{meal.strMeal}</h3>
      <p className="text-gray-600 dark:text-gray-400">Category: {meal.strCategory}</p>
    </div>
  </div>
);

const MealDetails = ({ meal, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{meal.strMeal}</h2>
        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-64 object-cover rounded-lg mb-4" />
        <p className="text-gray-600 dark:text-gray-400 mb-2"><strong>Category:</strong> {meal.strCategory}</p>
        <p className="text-gray-600 dark:text-gray-400 mb-2"><strong>Area:</strong> {meal.strArea}</p>
        <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">Instructions:</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{meal.strInstructions}</p>
        <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">Ingredients:</h3>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
          {Array.from({ length: 20 }, (_, i) => i + 1)
            .filter(i => meal[`strIngredient${i}`])
            .map(i => (
              <li key={i}>
                {meal[`strIngredient${i}`]} - {meal[`strMeasure${i}`]}
              </li>
            ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }

      const data = await response.json();
      setSearchResults(data.meals || []);
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMealSelect = async (mealId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch meal details');
      }

      const data = await response.json();
      if (data.meals && data.meals[0]) {
        setSelectedMeal(data.meals[0]);
      } else {
        throw new Error('Meal details not found');
      }
    } catch (err) {
      setError('An error occurred while fetching meal details. Please try again.');
      console.error('Meal details error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Search Recipes</h2>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter a meal name..."
            className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-r-md hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </form>

      {isLoading && <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>}
      
      {error && <p className="text-center text-red-500">{error}</p>}

      {hasSearched && searchResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((meal) => (
            <RecipeCard
              key={meal.idMeal}
              meal={meal}
              onClick={handleMealSelect}
            />
          ))}
        </div>
      )}

      {hasSearched && searchResults.length === 0 && !isLoading && (
        <p className="text-center text-gray-600 dark:text-gray-300">No results found. Try a different search term.</p>
      )}

      {selectedMeal && (
        <MealDetails meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      )}
    </div>
  );
};

export default Search;