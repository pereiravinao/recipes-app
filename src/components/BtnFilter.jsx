import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { filtraPorCategoria, apiNome } from '../services/RequestApi';
import Context from '../context/Context';

export default function BtnFilter({ page }) {
  const { btnCategory, setRequestApi, setRedirectDisable } = useContext(Context);
  const [btnToogle, setBtnToogle] = useState(false);
  const [state, setState] = useState('');
  const CINCO = 5;

  const handleCategory = (target) => {
    setState(target.value);
    const valor = target.value.toString();
    if (page.location.pathname === '/comidas') {
      filtraPorCategoria('themealdb', valor)
        .then((results) => setRequestApi(results));
      setRedirectDisable(true);
      setBtnToogle(true);
    }
    if (page.location.pathname === '/bebidas') {
      filtraPorCategoria('thecocktaildb', valor)
        .then((results) => setRequestApi(results));
      setRedirectDisable(true);
      setBtnToogle(true);
    }
  };

  const voltarReceitas = (target) => {
    setState(target.value);
    if (page.location.pathname === '/comidas') {
      setBtnToogle(false);
      apiNome('', '/comidas')
        .then((results) => setRequestApi(results));
    }
    if (page.location.pathname === '/bebidas') {
      setBtnToogle(false);
      apiNome('', '/bebidas')
        .then((results) => setRequestApi(results));
    }
  };

  function handleClick({ target }) {
    return btnToogle && state === target.value
      ? voltarReceitas(target) : handleCategory(target);
  }

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
              onClick={ (e) => handleClick(e) }
            >
              {strCategory}
            </button>
          )) : ''}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ (e) => handleClick(e) }
      >
        All

      </button>
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
