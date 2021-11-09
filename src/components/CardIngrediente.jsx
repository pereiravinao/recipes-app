import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { apiIngrediente } from '../services/RequestApi';
import Context from '../context/Context';

export default function CardIngrediente({
  idx, ingrediente: { strIngredient, strIngredient1 },
}) {
  const { setRequestApi, setLoadFirstTime } = useContext(Context);
  const history = useHistory();
  let nomeIngrediente = '';
  let imgSrc = '';
  let tipo = '';

  if (strIngredient) {
    nomeIngrediente = strIngredient;
    imgSrc = `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`;
    tipo = '/comidas';
  } else {
    nomeIngrediente = strIngredient1;
    imgSrc = `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`;
    tipo = '/bebidas';
  }

  function handleClick() {
    apiIngrediente(nomeIngrediente, tipo)
      .then((resultados) => {
        setRequestApi(resultados);
        setLoadFirstTime(false);
        if (tipo === '/comidas') {
          history.push('/comidas');
        } else {
          history.push('/bebidas');
        }
      });
  }

  return (
    <button type="button" onClick={ handleClick }>
      <div data-testid={ `${idx}-ingredient-card` }>
        <img
          data-testid={ `${idx}-card-img` }
          alt={ nomeIngrediente }
          src={ imgSrc }
          style={ { width: '50px' } }
        />
        <span data-testid={ `${idx}-card-name` }>{ nomeIngrediente }</span>
      </div>
    </button>
  );
}

CardIngrediente.propTypes = {
  idx: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  ingrediente: PropTypes.shape({
    strIngredient: PropTypes.string,
    strIngredient1: PropTypes.string,
  }).isRequired,
};
