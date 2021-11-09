import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../Style/Styles.css';

import { apiReceitaRecomendada } from '../services/RequestApi';

export default function ReceitasRecomendadas() {
  const history = useHistory();
  const [bebidaRecomendada, setBebidaRecomendada] = useState();
  const [pagina, setPagina] = useState(1);
  const SEIS = 6;
  const TRES = 3;
  const CINCO = 5;

  useEffect(() => {
    apiReceitaRecomendada('recomendaBebida')
      .then((results) => setBebidaRecomendada(results));
  }, []);

  return (
    <div>
      { !bebidaRecomendada
        ? ''
        : bebidaRecomendada.drinks
          .filter((_e, i) => i < SEIS)
          .map((receita, idx) => (
            <button
              type="button"
              data-testid={ `${idx}-recomendation-card` }
              key={ idx }
              onClick={ () => history.push(`/bebidas/${receita.idDrink}`) }
              disabled={ idx > pagina }
            >
              <img
                data-testid={ `${idx}-card-img` }
                style={ { width: '50px' } }
                src={ receita.strDrinkThumb }
                alt={ receita.strDrink }
              />
              <h4 data-testid={ `${idx}-recomendation-title` }>{ receita.strDrink }</h4>
            </button>
          ))}
      <button type="button" onClick={ () => setPagina(1) }>1</button>
      <button type="button" onClick={ () => setPagina(TRES) }>2</button>
      <button type="button" onClick={ () => setPagina(CINCO) }>3</button>
    </div>

  );
}
