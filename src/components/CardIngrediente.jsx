import React from 'react';
import PropTypes from 'prop-types';

export default function CardIngrediente(props) {
  const { idx, ingrediente: { strIngredient, strIngredient1 } } = props;
  let nomeIngrediente = '';
  let imgSrc = '';

  if (strIngredient) {
    nomeIngrediente = strIngredient;
    imgSrc = `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`;
  } else {
    nomeIngrediente = strIngredient1;
    imgSrc = `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`;
  }

  return (
    <div data-testid={ `${idx}-ingredient-card` }>
      <img
        data-testid={ `${idx}-card-img` }
        alt={ nomeIngrediente }
        src={ imgSrc }
        style={ { width: '50px' } }
      />
      <span data-testid={ `${idx}-card-name` }>{ nomeIngrediente }</span>
    </div>
  );
}

CardIngrediente.propTypes = {
  idx: PropTypes.number.isRequired,
  ingrediente: PropTypes.shape({
    strIngredient: PropTypes.string,
    strIngredient1: PropTypes.string,
  }).isRequired,
};
