import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

export default function CardsBebidas() {
  const { requestApi } = useContext(Context);
  const history = useHistory();
  const DOZE = 12;
  return (
    <div>
      { requestApi.drinks
        ? requestApi.drinks
          .filter((_e, i) => i < DOZE)
          .map((receita, idx) => (
            <button
              type="button"
              data-testid={ `${idx}-recipe-card` }
              key={ idx }
              onClick={ () => history.push(`/bebidas/${receita.idDrink}`) }
            >
              <img
                data-testid={ `${idx}-card-img` }
                style={ { width: '50px' } }
                src={ receita.strDrinkThumb }
                alt={ receita.strDrink }
              />
              <h4 data-testid={ `${idx}-card-name` }>{ receita.strDrink }</h4>
            </button>
          ))
        : ''}
    </div>
  );
}
