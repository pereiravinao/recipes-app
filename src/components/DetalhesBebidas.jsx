import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { apiReceitaID } from '../services/RequestApi';
import Ingredientes from './Bebidas/Ingredientes';
import BtnIniciarReceita from './Bebidas/BtnIniciarReceita';

import ComidaRecomendada from './ComidaRecomendada';
import Compartilhar from './Botoes/Compartilhar';
import FavoritarBebidas from './Botoes/FavoritarBebidas';

export default function DetalhesBebidas() {
  const [receitaDetalhes, setReceitaDetalhes] = useState();
  const locationId = useLocation().pathname;
  const location = locationId.replace('/bebidas/', '');

  useEffect(() => {
    apiReceitaID(location, '/bebidas').then((res) => setReceitaDetalhes(res));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      { !receitaDetalhes
        ? <Link to="/comidas">Voltar</Link>
        : receitaDetalhes.drinks
          .map((receita) => (
            <div key={ receita.idDrink }>
              <img
                data-testid="recipe-photo"
                style={ { width: '150px' } }
                src={ receita.strDrinkThumb }
                alt={ receita.strDrink }
              />
              <h4 data-testid="recipe-title">{ receita.strDrink }</h4>
              <Compartilhar idReceita={ locationId } />
              <FavoritarBebidas receita={ receita } />

              <h6 data-testid="recipe-category">{ receita.strAlcoholic}</h6>
              <h6 data-testid="recipe-category">{ receita.strCategory}</h6>

              <Ingredientes receitaDetalhes={ receitaDetalhes } />

              <p data-testid="instructions">{ receita.strInstructions }</p>
              <ComidaRecomendada recomenda="recomendaComida" />
              <BtnIniciarReceita receita={ receita } />

            </div>
          )) }
    </div>
  );
}
