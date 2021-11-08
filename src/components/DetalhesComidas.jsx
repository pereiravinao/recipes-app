import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Player } from 'video-react';
import Context from '../context/Context';

export default function DetalhesReceitas() {
  const { requestApi } = useContext(Context);

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
              <ul data-testid={ `${idx}-ingredient-name-and-measure` }>
                Ingredientes:
              </ul>
              <p data-testid="instructions">{ receita.strInstructions }</p>
              <Player
                data-testid="video"
                playsInline
                src={ receita.strYoutube }
                poster={ receita.strMealThumb }
              />
              <div data-testid={ `${idx}-recomendation-card` }>
                Receitas Recomendads
              </div>
              <button type="button" data-testid="favorite-btn">Favoritar</button>
            </div>
          )) }
    </div>
  );
}
