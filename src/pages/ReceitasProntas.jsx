import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Copy from 'clipboard-copy';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function ReceitasProntas() {
  const [copyStatus, setCopyStatus] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    let doneRecipesFromLocalStorage = JSON
      .parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesFromLocalStorage === null) doneRecipesFromLocalStorage = [];
    setRecipes(doneRecipesFromLocalStorage);
    setAllRecipes(doneRecipesFromLocalStorage);
  }, []);

  function shareAction(link) {
    const ONE_SECOND = 1000;
    setCopyStatus(true);
    Copy(link);
    setTimeout(() => setCopyStatus(false), ONE_SECOND);
  }

  function removeFromLocalStorage(index) {
    console.log(index);
    const favoriteRecipes = JSON
      .parse(localStorage.getItem('favoriteRecipes'));
    favoriteRecipes.splice(index, 1);
    console.log(favoriteRecipes);
    localStorage.setItem('favoriteRecipes',
      JSON.stringify(favoriteRecipes));
    setRecipes(favoriteRecipes);
  }

  function renderFavoriteRecipes(doneRecipes) {

    if (doneRecipes.length > 0) {
      return (
        doneRecipes.map((recipe, index) => {
          if (recipe.type === 'comida') {
            return (
              <div key={ recipe.id }>
                <Link to={ `/comidas/${recipe.id}` }>
                  <div data-testid={ `${recipe.id}-card-img` }>
                    <h5
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      { `${recipe.area} - ${recipe.category}`}

                    </h5>
                    <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
                    <img
                      data-testid={ `${index}-horizontal-image` }
                      style={ { width: '50px' } }
                      src={ recipe.image }
                      alt={ recipe.name }
                    />
                    <h4
                      data-testid={ `${index}-horizontal-done-date` }
                    >
                      { recipe.doneDate }

                    </h4>
                    { recipe.tags.map((tag) => (
                      <h5
                        key={ index }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        { tag }

                      </h5>
                    )) }
                  </div>
                </Link>
                <button type="button" onClick={ () => removeFromLocalStorage(index) }>
                  <img
                    src={ blackHeartIcon }
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    alt="Buscar"
                  />
                </button>
                <button
                  type="button"
                  onClick={ async () => shareAction(`http://localhost:3000/comidas/${recipe.id}`) }
                >
                  <img
                    src={ shareIcon }
                    data-testid={ `${index}-horizontal-share-btn` }
                    alt="Buscar"
                  />
                </button>
              </div>
            );
          }
          return (
            <div key={ recipe.id }>
              <Link to={ `/bebidas/${recipe.id}` }>
                <div data-testid={ `${recipe.id}-card-img` }>
                  <h5
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { `${recipe.alcoholicOrNot}`}

                  </h5>
                  <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    style={ { width: '50px' } }
                    src={ recipe.image }
                    alt={ recipe.name }
                  />
                </div>
                <h4
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  { recipe.doneDate }

                </h4>
              </Link>
              <button type="button" onClick={ () => removeFromLocalStorage(index) }>
                <img
                  src={ blackHeartIcon }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  alt="Buscar"
                />
              </button>
              <button
                type="button"
                onClick={ async () => shareAction(`http://localhost:3000/bebidas/${recipe.id}`) }
              >
                <img
                  src={ shareIcon }
                  data-testid={ `${index}-horizontal-share-btn` }
                  alt="Buscar"
                />
              </button>
            </div>
          );
        })

      );
    }
  }

  function renderAllRecipes() {
    setRecipes(allRecipes);
  }

  function renderOnlyMeals() {
    const filterMeals = allRecipes.filter((item) => item.type === 'comida');
    setRecipes(filterMeals);
  }

  function renderOnlyDrinks() {
    const filterDrinks = allRecipes.filter((item) => item.type === 'bebida');
    setRecipes(filterDrinks);
  }

  return (
    <div>
      <Header title="Receitas Feitas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => renderAllRecipes() }
      >
        All

      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => renderOnlyMeals() }
      >
        Food

      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => renderOnlyDrinks() }
      >
        Drinks

      </button>
      { renderFavoriteRecipes(recipes) }
      { copyStatus ? <h2>Link copiado!</h2> : '' }
    </div>
  );
}
