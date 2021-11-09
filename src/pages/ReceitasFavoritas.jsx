import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function ReceitasFavoritas() {
  const [copyStatus, setCopyStatus] = useState(false);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    let favoriteRecipesFromLocalStorage = JSON
      .parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipesFromLocalStorage === null) favoriteRecipesFromLocalStorage = [];
    setRecipes(favoriteRecipesFromLocalStorage);
  }, []);

  async function shareAction(link) {
    console.log('Copiou');
    await navigator.clipboard.writeText(link);
    setCopyStatus(true);
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

  function renderFavoriteRecipes(favoriteRecipes) {
    if (favoriteRecipes.length > 0) {
      return (
        favoriteRecipes.map((recipe, index) => {
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
                  onClick={ () => shareAction(`http://localhost:3000/comidas/${recipe.id}`) }
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
                onClick={ () => shareAction(`http://localhost:3000/bebidas/${recipe.id}`) }
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

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      { renderFavoriteRecipes(recipes) }
      { copyStatus ? <h2>Link copiado!</h2> : '' }
    </div>
  );
}
