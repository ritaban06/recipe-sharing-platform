import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CategoryMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryName } = useParams();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch meals');
        }
        const data = await response.json();
        setMeals(data.meals || []);
      } catch (err) {
        setError('Failed to load meals. Please try again later.');
        console.error('Error fetching meals:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [categoryName]);

  if (loading) {
    return <div className="text-center mt-8">Loading meals...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold mb-6">{categoryName} Meals</h2>
      {meals.length === 0 ? (
        <p className="text-center text-gray-500">No meals found in this category.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <li key={meal.idMeal} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Link to={`/meal/${meal.idMeal}`} className="block hover:shadow-lg transition duration-300">
                <img 
                  src={meal.strMealThumb || "/api/placeholder/300/200"} 
                  alt={meal.strMeal} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{meal.strMeal}</h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryMeals;