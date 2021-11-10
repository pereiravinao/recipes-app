import PropTypes from 'prop-types';
import React from 'react';

export default function Ingredientes({ receitaDetalhes }) {
  const quantidades = !receitaDetalhes ? [] : Object.entries(receitaDetalhes.meals[0])
    .filter((e) => e[0].includes('strMeasure'))
    .filter((i) => i[1] !== ' ').map((ing) => ing[1]);

  const ingredients = !receitaDetalhes ? [] : Object.entries(receitaDetalhes.meals[0])
    .filter((e) => e[0].includes('strIngredient'))
    .filter((i) => i[1] !== '').map((ing) => ing[1]);
  return (
    <ul>
      Ingredientes:
      { ingredients
        .map((ing, i) => (
          <li
            data-testid={ `${i}-ingredient-name-and-measure` }
            key={ i }
          >
            {`${ing} - ${quantidades[i]}`}

          </li>))}
    </ul>
  );
}

Ingredientes.propTypes = {
  receitaDetalhes: PropTypes.shape({
    meals: PropTypes.string,
  }).isRequired,
};
