import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { filtraPorCategoria } from '../services/RequestApi';
import Context from '../context/Context';

export default function BtnFilter({ page }) {
  const { btnCategory, setRequestApi, setRedirectDisable } = useContext(Context);
  const CINCO = 5;

  const handleCategory = ({ target }) => {
    const valor = target.value.toString();
    if (page.location.pathname === '/comidas') {
      filtraPorCategoria('themealdb', valor)
        .then((results) => setRequestApi(results));
      setRedirectDisable(true);
    }
    if (page.location.pathname === '/bebidas') {
      filtraPorCategoria('thecocktaildb', valor)
        .then((results) => setRequestApi(results));
      setRedirectDisable(true);
    }
  };

  return (
    <div>
      {btnCategory
        ? btnCategory.filter((_e, i) => i < CINCO)
          .map(({ strCategory }, i) => (
            <button
              type="button"
              key={ i }
              value={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ handleCategory }
            >
              {strCategory}
            </button>
          )) : ''}
    </div>
  );
}

BtnFilter.propTypes = {
  page: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};
