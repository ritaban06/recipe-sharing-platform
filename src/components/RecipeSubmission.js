import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';

const RecipeSubmission = () => {
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    image: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Initialize Firebase
    const firebaseConfig = {
      // Your Firebase configuration here
    };
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    // Fetch API data
    const fetchAPIData = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');
        const apiData = response.data;
        const dbRef = ref(db, 'api-data');
        await push(dbRef, apiData);
      } catch (error) {
        console.error('Error fetching or saving API data:', error);
      }
    };

    fetchAPIData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setRecipe(prevState => ({
      ...prevState,
      image: e.target.files[0]
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!recipe.title.trim()) tempErrors.title = "Title is required";
    if (!recipe.ingredients.trim()) tempErrors.ingredients = "Ingredients are required";
    if (!recipe.instructions.trim()) tempErrors.instructions = "Instructions are required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const formData = new FormData();
        formData.append('title', recipe.title);
        formData.append('ingredients', recipe.ingredients);
        formData.append('instructions', recipe.instructions);
        if (recipe.image) {
          formData.append('image', recipe.image);
        }

        const response = await fetch('/api/submit-recipe', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to submit recipe');
        }

        setRecipe({ title: '', ingredients: '', instructions: '', image: null });
        alert('Recipe submitted successfully!');
      } catch (error) {
        console.error('Error submitting recipe:', error);
        alert('Failed to submit recipe. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Submit a New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields remain the same */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isSubmitting
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-800'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Recipe'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeSubmission;