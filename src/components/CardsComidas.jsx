import React, { useContext } from 'react';
import Context from '../context/Context';

export default function CardsComidas() {
  const { requestApi } = useContext(Context);
  const DOZE = 12;
  return (
    <div>
      { requestApi.meals
        ? requestApi.meals
          .filter((_e, i) => i < DOZE)
          .map((receita, idx) => (
            <div key={ idx } data-testid={ `${idx}-recipe-card` }>
              <img
                data-testid={ `${idx}-card-img` }
                style={ { width: '50px' } }
                src={ receita.strMealThumb }
                alt={ receita.strMeal }
              />
              <h4 data-testid={ `${idx}-card-name` }>{ receita.strMeal }</h4>
            </div>
          ))
        : ''}
    </div>
  );
}
