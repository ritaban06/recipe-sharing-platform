import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAN2mXRvXiFMe_i8_vsv1UCp9HL8UZKEzU",
  authDomain: "cook-book-b9e75.firebaseapp.com",
  projectId: "cook-book-b9e75",
  storageBucket: "cook-book-b9e75.appspot.com",
  messagingSenderId: "43389357181",
  appId: "1:43389357181:web:94b9aae5f47175574d3514",
  measurementId: "G-Y52X75CEE4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

// Custom hook for API and database operations
const useAPIDBOperations = () => {
  useEffect(() => {
    const fetchAPIData = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');
        const apiData = response.data;
        await addDoc(collection(db, 'api-data'), apiData);
        console.log('API data fetched and saved successfully');
      } catch (error) {
        console.error('Error fetching or saving API data:', error);
      }
    };

    fetchAPIData();
  }, []);

  const saveRecipe = async (recipeData) => {
    try {
      console.log('Attempting to save recipe:', recipeData);

      if (!auth.currentUser) {
        throw new Error('User not authenticated');
      }

      if (!recipeData.title || !recipeData.ingredients || !recipeData.instructions) {
        throw new Error('Missing required fields');
      }

      const dataToSave = {
        ...recipeData,
        createdAt: new Date(),
        userId: auth.currentUser.uid
      };

      const docRef = await addDoc(collection(db, 'recipes'), dataToSave);
      console.log('Document written with ID: ', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error saving recipe:', error);
      throw error;
    }
  };

  return { saveRecipe };
};

const RecipeSubmission = () => {
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    image: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { saveRecipe } = useAPIDBOperations();

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
        let imageUrl = null;
        if (recipe.image) {
          const imageRef = storageRef(storage, `recipe-images/${Date.now()}_${recipe.image.name}`);
          const snapshot = await uploadBytes(imageRef, recipe.image);
          imageUrl = await getDownloadURL(snapshot.ref);
        }

        const recipeId = await saveRecipe({
          title: recipe.title,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          imageUrl: imageUrl,
        });

        setRecipe({
          title: '',
          ingredients: '',
          instructions: '',
          image: null
        });
        alert(`Recipe submitted successfully! Recipe ID: ${recipeId}`);
      } catch (error) {
        console.error('Error submitting recipe:', error);
        let errorMessage = 'An error occurred while submitting the recipe.';
        if (error.message === 'User not authenticated') {
          errorMessage = 'Please sign in to submit a recipe.';
        } else if (error.message === 'Missing required fields') {
          errorMessage = 'Please fill in all required fields.';
        } else if (error.code === 'permission-denied') {
          errorMessage = 'You do not have permission to submit recipes.';
        }
        alert(errorMessage + ' Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Submit a New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Recipe Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
        </div>
        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ingredients</label>
          <textarea
            id="ingredients"
            name="ingredients"
            rows="3"
            value={recipe.ingredients}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
          {errors.ingredients && <p className="mt-2 text-sm text-red-600">{errors.ingredients}</p>}
        </div>
        <div>
          <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            rows="5"
            value={recipe.instructions}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
          {errors.instructions && <p className="mt-2 text-sm text-red-600">{errors.instructions}</p>}
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Recipe Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
        </div>
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