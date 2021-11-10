import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

export default function FavoritarBebidas({ receita }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const locationId = useLocation().pathname;
  const location = locationId.replace('/bebidas/', '');

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
      .some((favRecipes) => favRecipes.id === recipe.idDrink);
    if (isFavoritedAlready) return favoriteRecipes;
    const newFavoriteRecipe = {
      id: recipe.idDrink,
      type: 'bebida',
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
    localStorage.setItem('favoriteRecipes',
      JSON.stringify([...favoriteRecipes, newFavoriteRecipe]));
  }

  return (
    <button
      type="button"
      onClick={ () => saveFavoriteToLocalStorage(receita) }
    >
      <img
        data-testid="favorite-btn"
        src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
        alt="Favoritar"
      />
    </button>
  );
}

FavoritarBebidas.propTypes = {
  receita: PropTypes.objectOf.isRequired,
};
