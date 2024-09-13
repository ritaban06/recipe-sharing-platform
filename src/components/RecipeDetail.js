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
        // Replace this with your actual API endpoint
        const response = await fetch(`YOUR_API_ENDPOINT/recipes/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }
        const data = await response.json();
        setRecipe(data);
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img 
        src={recipe.image || "/api/placeholder/600/400"} 
        alt={recipe.title} 
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700 mb-4">{recipe.description}</p>
        
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside mb-4">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-700">{ingredient}</li>
          ))}
        </ul>
        
        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <ol className="list-decimal list-inside">
          {recipe.instructions.map((step, index) => (
            <li key={index} className="text-gray-700 mb-2">{step}</li>
          ))}
        </ol>
        
        <div className="mt-6">
          <span className="text-sm text-gray-500">
            Prep Time: {recipe.prepTime} | Cook Time: {recipe.cookTime} | Servings: {recipe.servings}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;