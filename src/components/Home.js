import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FeaturedRecipeCard = ({ title, description, imageUrl }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
    <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      <Link to={`/recipes/${title.toLowerCase().replace(/\s+/g, '-')}`} className="text-blue-500 dark:text-blue-400 hover:underline">
        View Recipe
      </Link>
    </div>
  </div>
);

const Home = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('https://api.example.com/recipes/featured');
        if (!response.ok) {
          throw new Error('Failed to fetch featured recipes');
        }
        const data = await response.json();
        setFeaturedRecipes(data);
      } catch (err) {
        setError('Failed to load featured recipes. Please try again later.');
        console.error('Error fetching featured recipes:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedRecipes();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Welcome to Recipe Share</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Discover, share, and enjoy delicious recipes from around India!
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Featured Recipes</h2>
        {isLoading && <p className="text-center text-gray-600 dark:text-gray-400">Loading featured recipes...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRecipes.map((recipe) => (
              <FeaturedRecipeCard
                key={recipe.id}
                title={recipe.title}
                description={recipe.description}
                imageUrl={recipe.imageUrl}
              />
            ))}
          </div>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Get Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Browse Recipes</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">Explore our collection of delicious recipes from various Indian households.</p>
            <Link to="/recipes" className="text-blue-500 dark:text-blue-400 hover:underline">
              View All Recipes
            </Link>
          </div>
          <div className="bg-green-100 dark:bg-green-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Share Your Recipe</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">Got a great recipe? Share it with our community!</p>
            <Link to="/submit" className="text-green-500 dark:text-green-400 hover:underline">
              Submit a Recipe
            </Link>
          </div>
          <div className="bg-yellow-100 dark:bg-yellow-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Search Recipes</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">Looking for something specific? Use our search feature.</p>
            <Link to="/search" className="text-yellow-600 dark:text-yellow-400 hover:underline">
              Search Recipes
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">About Recipe Share</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Recipe Share is a community-driven platform where food enthusiasts can discover, 
          share, and discuss their favorite recipes. Whether you're a seasoned chef or a 
          beginner in the kitchen, you'll find inspiration and support from our diverse 
          community of food lovers.
        </p>
      </section>
    </div>
  );
};

export default Home;