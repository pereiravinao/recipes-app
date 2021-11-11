import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import { setStorage, newDoneRecipe, getStorage } from '../store/Storage';
import ReturnRecipe from '../services/ReturnRecipe';
import { storageMeals, storageCocktails } from '../store/LocalStorageIngredients';
import FavoriteAndShareBtn from '../components/Botoes/FavoriteAndShareBtn';

export default function InProgress() {
  const { id } = useParams();
  const history = useHistory();
  const { location: { pathname } } = history;
  const [returnedDetail, setReturnedDetail] = useState([]);
  const [arrayIngredients, setArrayIngredients] = useState([]);
  const [doneRecipes] = useState(getStorage('doneRecipes'));
  const [typeFoods, setTypeFoods] = useState('');
  const [recipe, setRecipe] = useState('');
  const [inProgressRecipes, setInprogressRecipes] = useState();
  const [btnDoneRecipe, setBtnDoneRecipe] = useState(true);
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  const addDoneRecipe = () => {
    const newDoneRecip = newDoneRecipe(returnedDetail, typeFoods);
    const saveLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setStorage('doneRecipes', [...doneRecipes, newDoneRecip]);
    delete saveLocalStorage[recipe][id];
    setStorage('inProgressRecipes', saveLocalStorage);
  };

  useEffect(() => {
    const saveLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setInprogressRecipes(saveLocalStorage);
  }, []);

  useEffect(() => {
    async function testtee() {
      const { fetchDetails, typeFood,
        recipeType, ingredientsList } = await ReturnRecipe(id, pathname);
      setReturnedDetail(fetchDetails);
      setTypeFoods(typeFood);
      setRecipe(recipeType);
      setArrayIngredients(ingredientsList);
    }
    testtee();
  }, [pathname, id]);

  if (!localStorage.inProgressRecipes) {
    localStorage.setItem('inProgressRecipes',
      JSON.stringify({
        cocktails: {},
        meals: {},
      }));
  }

  function valueIngredients({ target }) {
    if (pathname.includes('comida')) {
      const savedata = ((storageMeals(pathname, target.id, id)));
      setCheckedIngredients(savedata);
    } else {
      const savedata = ((storageCocktails(pathname, target.id, id)));
      setCheckedIngredients(savedata);
    }
  }

  useEffect(() => {
    function disable() {
      if (checkedIngredients.length
        === arrayIngredients.length) {
        return false;
      }
      return true;
    }
    setBtnDoneRecipe(disable());
  }, [arrayIngredients, checkedIngredients]);

  return (
    <div className="container-recipe">
      <img
        data-testid="recipe-photo"
        alt="Thumb Recipe"
        src={ pathname.includes('comidas')
          ? returnedDetail.strMealThumb
          : returnedDetail.strDrinkThumb }
        width="360px"
        height="360px"
      />
      <h3 data-testid="recipe-title">
        { pathname.includes('comidas')
          ? returnedDetail.strMeal
          : returnedDetail.strDrink}
      </h3>
      <FavoriteAndShareBtn details={ returnedDetail } />
      <p data-testid="recipe-category">{returnedDetail.strCategory}</p>
      { arrayIngredients.map((ingredient, index) => (
        <ol key={ index }>
          <label
            htmlFor={ ingredient }
            data-testid={ `${index}-ingredient-step` }
            key={ index }
          >
            {(!!inProgressRecipes[recipe][id] && inProgressRecipes[recipe][id]
              .includes(ingredient)) ? <input
                id={ ingredient }
                type="checkbox"
                key={ index }
                onClick={ (e) => valueIngredients(e) }
                defaultChecked
              /> : <input
                id={ ingredient }
                type="checkbox"
                key={ index }
                onClick={ (e) => valueIngredients(e) }
              />}
            {ingredient}
          </label>
        </ol>
      ))}
      <p data-testid="instructions">{returnedDetail.strInstructions}</p>
      <Link to="/receitas-feitas">
        <button
          type="button"
          alt="Finish-Recipe"
          onClick={ addDoneRecipe }
          data-testid="finish-recipe-btn"
          disabled={ btnDoneRecipe }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}
