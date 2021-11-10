import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

export default function FavoritarComida({ receita }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const locationId = useLocation().pathname;
  const location = locationId.replace('/comidas/', '');

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setIsFavorited(favoriteRecipes
      ? favoriteRecipes.some((e) => e.id === location) : false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function saveFavoriteToLocalStorage(recipe) {
    setIsFavorited(true);
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes === null) {
      favoriteRecipes = [];
    }
    const isFavoritedAlready = favoriteRecipes
      .some((favRecipes) => favRecipes.id === recipe.idMeal);
    if (isFavoritedAlready) return favoriteRecipes;
    const newFavoriteRecipe = {
      id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };
    localStorage.setItem('favoriteRecipes',
      JSON.stringify([...favoriteRecipes, newFavoriteRecipe]));
  }

  function handleClick(recceita) {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (isFavorited) {
      setIsFavorited(false);
      const desfavoritar = favoriteRecipes.filter((e) => e.id !== recceita.idMeal);
      localStorage.setItem('favoriteRecipes',
        JSON.stringify(desfavoritar));
    } else { saveFavoriteToLocalStorage(recceita); }
  }

  return (
    <button
      type="button"
      onClick={ () => handleClick(receita) }
    >
      <img
        data-testid="favorite-btn"
        src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
        alt="Favoritar"
      />
    </button>
  );
}

FavoritarComida.propTypes = {
  receita: PropTypes.objectOf.isRequired,
};
