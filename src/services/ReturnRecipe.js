import { fetchFoodDetails, fetchDrinksDetails } from './RequestApi';
import ingredientsMealDetails from '../components/IngredientsMealDetails';
import ingredientsDrinksDetails from '../components/IngredientsDrinksDetails';

const ReturnRecipe = async (id, pathname) => {
  if (pathname.includes('comidas')) {
    const fetchDetails = await fetchFoodDetails(id);
    const typeFood = 'comida';
    const recipeType = 'meals';
    const ingredientsList = ingredientsMealDetails(fetchDetails);
    return { fetchDetails, typeFood, recipeType, ingredientsList };
  }
  if (pathname.includes('bebidas')) {
    const fetchDetails = await fetchDrinksDetails(id);
    const typeFood = 'bebida';
    const recipeType = 'cocktails';
    const ingredientsList = ingredientsDrinksDetails(fetchDetails);
    return { fetchDetails, typeFood, recipeType, ingredientsList };
  }
};

export default ReturnRecipe;
