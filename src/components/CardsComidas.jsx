import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

export default function CardsComidas() {
  const { requestApi } = useContext(Context);
  const history = useHistory();
  const DOZE = 12;
  return (
    <div>
      { requestApi.meals
        ? requestApi.meals
          .filter((_e, i) => i < DOZE)
          .map((receita, idx) => (
            <button
              type="button"
              data-testid={ `${idx}-recipe-card` }
              key={ idx }
              onClick={ () => history.push(`/comidas/${receita.idMeal}`) }
            >
              <img
                data-testid={ `${idx}-card-img` }
                style={ { width: '50px' } }
                src={ receita.strMealThumb }
                alt={ receita.strMeal }
              />
              <h4 data-testid={ `${idx}-card-name` }>{ receita.strMeal }</h4>
            </button>
          ))
        : ''}
    </div>
  );
}
