import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function BtnIniciarReceita({ receita }) {
  const receitaIniciada = JSON.parse(localStorage
    .getItem('inProgressRecipes')) || { meals: '' };
  const idStorage = Object.keys(receitaIniciada.meals)[0];

  function saveStorageinProgressRecipes(recipe) {
    const storageRecipesInProgress = {
      cocktails: {
        idDrink: [],
      },
      meals: {
        [recipe]: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(storageRecipesInProgress));
  }

  return (
    <Link to={ `/comidas/${receita.idMeal}/in-progress` }>
      <button
        type="button"
        data-testid="start-recipe-btn"
        style={ { position: 'fixed', bottom: '0px' } }
        onClick={ () => saveStorageinProgressRecipes(receita.idMeal) }
      >
        { idStorage === receita.idMeal
          ? 'Continuar Receita' : 'Iniciar Receita'}

      </button>
    </Link>
  );
}

BtnIniciarReceita.propTypes = {
  receita: PropTypes.shape({
    idMeal: PropTypes.string,
  }).isRequired,
};
