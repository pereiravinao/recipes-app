import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';

export default function DetalhesReceitas() {
  const { requestApi } = useContext(Context);
  console.log(requestApi);
  const quantidades = !requestApi ? '' : Object.entries(requestApi.drinks[0])
    .filter((e) => e[0].includes('strMeasure'))
    .filter((i) => i[1] !== null).map((ing) => ing[1]);

  const ingredients = !requestApi ? '' : Object.entries(requestApi.drinks[0])
    .filter((e) => e[0].includes('strIngredient'))
    .filter((i) => i[1] !== null).map((ing) => ing[1]);

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
              <button type="button" data-testid="favorite-btn">Favoritar</button>
              <h6 data-testid="recipe-category">{ receita.strAlcoholic}</h6>
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
