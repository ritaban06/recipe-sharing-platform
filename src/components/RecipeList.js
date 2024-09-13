import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ id, title, description, image }) => (
  <Link to={`/recipes/${id}`} className="block hover:shadow-lg transition duration-300">
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </Link>
);

const RecipeList = () => {
  // Sample data - replace this with actual data fetching logic later
  const recipes = [
    { id: 1, title: "Spaghetti Carbonara", description: "Classic Italian pasta dish", image: "/api/placeholder/300/200" },
    { id: 2, title: "Chicken Tikka Masala", description: "Creamy and spicy Indian curry", image: "/api/placeholder/300/200" },
    { id: 3, title: "Beef Tacos", description: "Mexican street-style tacos", image: "/api/placeholder/300/200" },
    { id: 4, title: "Caesar Salad", description: "Fresh and crispy salad with homemade dressing", image: "/api/placeholder/300/200" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6">Recipe List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;