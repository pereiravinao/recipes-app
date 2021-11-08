import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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
            <Link key={ idx } to={ `/bebidas/${receita.idDrink}` }>
              <div data-testid={ `${idx}-recipe-card` }>
                <img
                  data-testid={ `${idx}-card-img` }
                  style={ { width: '50px' } }
                  src={ receita.strDrinkThumb }
                  alt={ receita.strDrink }
                />
                <h4 data-testid={ `${idx}-card-name` }>{ receita.strDrink }</h4>
              </div>
            </Link>
          ))
        : ''}
    </div>
  );
}
