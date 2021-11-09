import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Player } from 'video-react';
import Context from '../context/Context';
import { apiReceitaRecomendada } from '../services/RequestApi';

export default function DetalhesReceitas() {
  const { requestApi } = useContext(Context);
  const [bebidaRecomendada, setBebidaRecomendada] = useState();
  console.log(bebidaRecomendada);

  const quantidades = !requestApi ? '' : Object.entries(requestApi.meals[0])
    .filter((e) => e[0].includes('strMeasure'))
    .filter((i) => i[1] !== ' ').map((ing) => ing[1]);

  const ingredients = !requestApi ? '' : Object.entries(requestApi.meals[0])
    .filter((e) => e[0].includes('strIngredient'))
    .filter((i) => i[1] !== '').map((ing) => ing[1]);

  useEffect(() => {
    apiReceitaRecomendada('recomendaBebida')
      .then((results) => setBebidaRecomendada(results));
  }, []);

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
              <button type="button" data-testid="share-btn">Compartilhar</button>
              <button type="button" data-testid="favorite-btn">Favoritar</button>
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
