import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Player } from 'video-react';
import Context from '../context/Context';
import { apiReceitaRecomendada } from '../services/RequestApi';
import shareIcon from '../images/shareIcon.svg';

export default function DetalhesReceitas() {
  const { requestApi } = useContext(Context);
  const [bebidaRecomendada, setBebidaRecomendada] = useState();
  const [copied, setCopied] = useState(false);
  console.log(bebidaRecomendada);

  const quantidades = !requestApi ? [] : Object.entries(requestApi.meals[0])
    .filter((e) => e[0].includes('strMeasure'))
    .filter((i) => i[1] !== ' ').map((ing) => ing[1]);

  const ingredients = !requestApi ? [] : Object.entries(requestApi.meals[0])
    .filter((e) => e[0].includes('strIngredient'))
    .filter((i) => i[1] !== '').map((ing) => ing[1]);

  useEffect(() => {
    apiReceitaRecomendada('recomendaBebida')
      .then((results) => setBebidaRecomendada(results));
  }, []);

  function saveFavoriteToLocalStorage(recipe) {
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes === null) {
      favoriteRecipes = [];
    }
    const isFavoritedAlready = favoriteRecipes
      .some((favRecipes) => favRecipes.id === recipe.idMeal);
    if (isFavoritedAlready) return favoriteRecipes;
    const newFavoriteRecipe = {
      id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };
    localStorage.setItem('favoriteRecipes',
      JSON.stringify([...favoriteRecipes, newFavoriteRecipe]));
  }

  function handleClick(id) {
    navigator.clipboard.writeText(`http://localhost:3000/comidas/${id}`);
    setCopied(true);
  }

  return (
    <div>
      { !requestApi
        ? <Link to="/comidas">Voltar</Link>
        : requestApi.meals
          .map((receita, idx) => (
            <div key={ receita.idMeal }>
              <img
                data-testid="recipe-photo"
                style={ { width: '150px' } }
                src={ receita.strMealThumb }
                alt={ receita.strMeal }
              />
              <h4 data-testid="recipe-title">{ receita.strMeal }</h4>
              <button
                type="button"
                data-testid="share-btn"
                onClick={ () => { handleClick(receita.idMeal); } }
              >
                <img src={ shareIcon } alt="Compartilhar" />
              </button>
              <button
                type="button"
                data-testid="favorite-btn"
                onClick={ () => saveFavoriteToLocalStorage(receita) }
              >
                Favoritar

              </button>
              { copied ? 'Link copiado!' : ''}
              <h6 data-testid="recipe-category">{ receita.strCategory}</h6>
              <ul>
                Ingredientes:
                { ingredients
                  .map((ing, i) => (
                    <li
                      data-testid={ `${i}-ingredient-name-and-measure` }
                      key={ i }
                    >
                      {`${ing} - ${quantidades[i]}`}

                    </li>))}
              </ul>
              <p data-testid="instructions">{ receita.strInstructions }</p>
              <div style={ { width: '10px' } } data-testid="video">
                <Player
                  playsInline
                  src={ receita.strYoutube }
                  // poster={ receita.strMealThumb }
                />
              </div>
              <div data-testid={ `${idx}-recomendation-card` }>
                Receitas Recomendads
              </div>
              <Link to={ `/comidas/${receita.idMeal}/in-progress` }>
                <button
                  type="button"
                  data-testid="start-recipe-btn"
                  style={ { position: 'fixed', bottom: '0px' } }
                >
                  Iniciar Receita

                </button>
              </Link>
            </div>
          )) }
    </div>
  );
}
