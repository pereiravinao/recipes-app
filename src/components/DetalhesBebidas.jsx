import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';

export default function DetalhesReceitas() {
  const { requestApi } = useContext(Context);

  function saveFavoriteToLocalStorage(recipe) {
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes === null) {
      favoriteRecipes = [];
    }
    const isFavoritedAlready = favoriteRecipes
      .some((favRecipes) => favRecipes.id === recipe.idDrink);
    if (isFavoritedAlready) return favoriteRecipes;
    const newFavoriteRecipe = {
      id: recipe.idDrink,
      type: 'bebida',
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
    localStorage.setItem('favoriteRecipes',
      JSON.stringify([...favoriteRecipes, newFavoriteRecipe]));
  }

  return (
    <div>
      { !requestApi
        ? <Link to="/comidas">Voltar</Link>
        : requestApi.drinks
          .map((receita, idx) => (
            <div key={ receita.idDrink }>
              <img
                data-testid="recipe-photo"
                style={ { width: '150px' } }
                src={ receita.strDrinkThumb }
                alt={ receita.strDrink }
              />
              <h4 data-testid="recipe-title">{ receita.strDrink }</h4>
              <button type="button" data-testid="share-btn">Compartilhar</button>
              <button
                type="button"
                data-testid="favorite-btn"
                onClick={ () => saveFavoriteToLocalStorage(receita) }
              >
                Favoritar

              </button>
              <h6 data-testid="recipe-category">{ receita.strCategory}</h6>
              <ul data-testid={ `${idx}-ingredient-name-and-measure` }>
                Ingredientes:
              </ul>
              <p data-testid="instructions">{ receita.strInstructions }</p>
              <div data-testid={ `${idx}-recomendation-card` }>
                Receitas Recomendads
              </div>
              <button
                type="button"
                data-testid="start-recipe-btn"
              >
                Iniciar Receita

              </button>
            </div>
          )) }
    </div>
  );
}
