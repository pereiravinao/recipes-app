import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { Player } from 'video-react';
import { apiReceitaID } from '../services/RequestApi';
import BebidaRecomendada from './BebidaRecomendada';

import Ingredientes from './Comidas/Ingredientes';
import BtnIniciarReceita from './Comidas/BtnIniciarReceita';
import Compartilhar from './Botoes/Compartilhar';
import FavoritarComidas from './Botoes/FavoritarComidas';

export default function DetalhesComidas() {
  const [receitaDetalhes, setReceitaDetalhes] = useState();
  const locationId = useLocation().pathname;
  const location = locationId.replace('/comidas/', '');

  useEffect(() => {
    apiReceitaID(location, '/comidas').then((res) => setReceitaDetalhes(res));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      { !receitaDetalhes
        ? <Link to="/comidas">Voltar</Link>
        : receitaDetalhes.meals
          .map((receita) => (
            <div key={ receita.idMeal }>
              <img
                data-testid="recipe-photo"
                style={ { width: '150px' } }
                src={ receita.strMealThumb }
                alt={ receita.strMeal }
              />
              <h4 data-testid="recipe-title">{ receita.strMeal }</h4>
              <Compartilhar idReceita={ locationId } />
              <FavoritarComidas receita={ receita } />

              <h6 data-testid="recipe-category">{ receita.strCategory}</h6>

              <Ingredientes receitaDetalhes={ receitaDetalhes } />

              <p data-testid="instructions">{ receita.strInstructions }</p>

              <div style={ { width: '10px' } } data-testid="video">
                {/* <Player
                  playsInline
                  src={ receita.strYoutube }
                  // poster={ receita.strMealThumb }
                /> */}
              </div>
              <BebidaRecomendada recomenda="recomendaBebida" />

              <BtnIniciarReceita receita={ receita } />
            </div>
          )) }
    </div>
  );
}
