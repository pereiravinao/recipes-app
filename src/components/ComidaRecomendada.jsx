import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { apiReceitaRecomendada } from '../services/RequestApi';

export default function ReceitasRecomendadas() {
  const history = useHistory();
  const [comidaRecomendada, setComidaRecomendada] = useState();
  const [pagina, setPagina] = useState(1);
  const SEIS = 6;
  const TRES = 3;
  const CINCO = 5;

  useEffect(() => {
    apiReceitaRecomendada('recomendaComida')
      .then((results) => setComidaRecomendada(results));
  }, []);

  return (
    <div>
      { !comidaRecomendada
        ? ''
        : comidaRecomendada.meals
          .filter((_e, i) => i < SEIS)
          .map((receita, idx) => (
            <button
              type="button"
              style={ idx > pagina ? { display: 'none' } : {} }
              data-testid={ `${idx}-recomendation-card` }
              key={ idx }
              onClick={ () => history.push(`/comidas/${receita.idMeal}`) }
              disabled={ idx > pagina }
            >
              <img
                data-testid={ `${idx}-card-img` }
                style={ { width: '50px' } }
                src={ receita.strMealThumb }
                alt={ receita.strMeal }
              />
              <h4 data-testid={ `${idx}-recomendation-title` }>{ receita.strMeal }</h4>
            </button>
          ))}
      <button type="button" onClick={ () => setPagina(1) }>1</button>
      <button type="button" onClick={ () => setPagina(TRES) }>2</button>
      <button type="button" onClick={ () => setPagina(CINCO) }>3</button>
    </div>

  );
}
