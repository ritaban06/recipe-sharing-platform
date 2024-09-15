import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, areasResponse, ingredientsResponse] = await Promise.all([
          fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list'),
          fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list'),
          fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list'),
          fetch('www.themealdb.com/api/json/v1/1/lookup.php?i=52772')

        ]);

        if (!categoriesResponse.ok || !areasResponse.ok || !ingredientsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const categoriesData = await categoriesResponse.json();
        const areasData = await areasResponse.json();
        const ingredientsData = await ingredientsResponse.json();

        setCategories(categoriesData.meals || []);
        setAreas(areasData.meals || []);
        setIngredients(ingredientsData.meals || []);
      } catch (err) {
        setError('Failed to load recipe data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading recipe data...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  const renderList = (title, items, keyPrefix) => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {items.length === 0 ? (
        <p className="text-center text-gray-500">No {title.toLowerCase()} found.</p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item, index) => (
            <li key={`${keyPrefix}-${index}`} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Link to={`/${keyPrefix}/${Object.values(item)[0]}`} className="block p-4 hover:bg-gray-50 transition duration-300">
                <span className="text-lg font-medium">{Object.values(item)[0]}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Recipe Explorer</h1>
      {renderList("Categories", categories, "category")}
      {renderList("Areas", areas, "area")}
      {renderList("Ingredients", ingredients, "ingredient")}
    </div>
  );
};

export default RecipeList;