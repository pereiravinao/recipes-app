import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function ReceitasFavoritas() {
  function renderFavoriteRecipes() {
    let favoriteRecipes = JSON
      .parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes === null) favoriteRecipes = [];
    console.log(favoriteRecipes);
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
                <img
                  src={ blackHeartIcon }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  alt="Buscar"
                />
                <img
                  src={ shareIcon }
                  data-testid={ `${index}-horizontal-share-btn` }
                  alt="Buscar"
                />
              </div>
            );
          }
          return (
            <div key={ recipe.id }>
              <Link to={ `/comidas/${recipe.id}` }>
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
              <img
                src={ blackHeartIcon }
                data-testid={ `${index}-horizontal-favorite-btn` }
                alt="Buscar"
              />
              <img
                src={ shareIcon }
                data-testid={ `${index}-horizontal-share-btn` }
                alt="Buscar"
              />
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
      { renderFavoriteRecipes() }
    </div>
  );
}
