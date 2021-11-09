import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function BtnIniciarReceita({ receita }) {
  const receitaIniciada = JSON.parse(localStorage
    .getItem('inProgressRecipes')) || { cocktails: '' };
  const idStorage = Object.keys(receitaIniciada.cocktails)[0];

  function saveStorageinProgressRecipes(recipe) {
    const storageRecipesInProgress = {
      cocktails: {
        [recipe]: [],
      },
      meals: {
        idMeal: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(storageRecipesInProgress));
  }

  return (
    <Link to={ `/bebidas/${receita.idDrink}/in-progress` }>
      <button
        type="button"
        data-testid="start-recipe-btn"
        style={ { position: 'fixed', bottom: '0px' } }
        onClick={ () => saveStorageinProgressRecipes(receita.idDrink) }
      >
        { idStorage === receita.idDrink
          ? 'Continuar Receita' : 'Iniciar Receita'}

      </button>
    </Link>
  );
}

BtnIniciarReceita.propTypes = {
  receita: PropTypes.shape({
    idDrink: PropTypes.string,
  }).isRequired,
};
