import React, { useContext } from 'react';
import Context from '../context/Context';

export default function CardsBebidas() {
  const { requestApi } = useContext(Context);
  const DOZE = 12;
  return (
    <div>
      { requestApi.drinks
        ? requestApi.drinks
          .filter((_e, i) => i < DOZE)
          .map((receita, idx) => (
            <div key={ idx } data-testid={ `${idx}-recipe-card` }>
              <img
                data-testid={ `${idx}-card-img` }
                style={ { width: '50px' } }
                src={ receita.strDrinkThumb }
                alt={ receita.strDrink }
              />
              <h4 data-testid={ `${idx}-card-name` }>{ receita.strDrink }</h4>
            </div>
          ))
        : ''}
    </div>
  );
}
