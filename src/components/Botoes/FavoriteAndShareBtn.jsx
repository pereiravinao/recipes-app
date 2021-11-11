import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { getStorage, setStorage, newFavoriteRecipes } from '../../store/Storage';

export default function FavoriteAndShareBtn(props) {
  const { details } = props;
  const { id } = useParams();
  const [linkCopied, setLinkCopied] = useState('');
  const [favorited, setFavorited] = useState(false);
  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    const favorites = getStorage('favoriteRecipes');
    favorites.forEach((favorite) => { if (favorite.id === id) { setFavorited(true); } });
  }, [id]);

  function copyUrlToClipboard() {
    setLinkCopied('Link copiado!');
    navigator.clipboard.writeText(window.location.href.replace('/in-progress', ''));
  }

  const addOrRemoveFavoriteRecipe = () => {
    const favoriteRecipes = getStorage('favoriteRecipes');
    if (favoriteRecipes.some((recipe) => recipe.id === id)) {
      setFavorited(false);
      setStorage('favoriteRecipes', favoriteRecipes.filter((recipe) => recipe.id !== id));
    } else {
      const foodType = pathname.includes('comida') ? 'comida' : 'bebida';
      setFavorited(true);
      const newFavoriteRecip = newFavoriteRecipes(details, foodType);
      setStorage('favoriteRecipes', [...favoriteRecipes, newFavoriteRecip]);
    }
  };

  return (
    <div>
      {linkCopied}
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => copyUrlToClipboard() }
      >
        <img src={ shareIcon } alt="Botão compartilhar" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        src={ favorited ? blackHeartIcon : whiteHeartIcon }
        onClick={ () => addOrRemoveFavoriteRecipe() }
      >
        <img
          src={ favorited ? blackHeartIcon : whiteHeartIcon }
          alt="Botão favoritar"
        />
      </button>
    </div>
  );
}

FavoriteAndShareBtn.propTypes = {
  details: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};
