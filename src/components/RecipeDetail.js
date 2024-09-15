import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }
        const data = await response.json();
        setRecipe(data.meals[0]);
      } catch (err) {
        setError('Failed to load recipe. Please try again later.');
        console.error('Error fetching recipe:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (!recipe) {
    return <div className="text-center mt-8">Recipe not found</div>;
  }

  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (recipe[`strIngredient${i}`]) {
        ingredients.push(`${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`);
      }
    }
    return ingredients;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{recipe.strMeal}</h1>
      <img 
        src={recipe.strMealThumb || "/api/placeholder/600/400"} 
        alt={recipe.strMeal} 
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Category</h2>
        <p className="text-gray-700 mb-4">{recipe.strCategory}</p>
        
        <h2 className="text-xl font-semibold mb-2">Area</h2>
        <p className="text-gray-700 mb-4">{recipe.strArea}</p>
        
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside mb-4">
          {getIngredients().map((ingredient, index) => (
            <li key={index} className="text-gray-700">{ingredient}</li>
          ))}
        </ul>
        
        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <p className="text-gray-700 mb-4">{recipe.strInstructions}</p>
        
        {recipe.strYoutube && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Video Tutorial</h2>
            <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Watch on YouTube
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;