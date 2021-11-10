import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { apiReceitaID } from '../services/RequestApi';
import Ingredientes from './Bebidas/Ingredientes';
import BtnIniciarReceita from './Bebidas/BtnIniciarReceita';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import ComidaRecomendada from './ComidaRecomendada';
import Compartilhar from './Botoes/Compartilhar';

export default function DetalhesBebidas() {
  const [isFavorited, setIsFavorited] = useState(false);
  const [receitaDetalhes, setReceitaDetalhes] = useState();
  const locationId = useLocation().pathname;
  const location = locationId.replace('/bebidas/', '');

  useEffect(() => {
    apiReceitaID(location, '/bebidas').then((res) => setReceitaDetalhes(res));
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
    <div>
      { !receitaDetalhes
        ? <Link to="/comidas">Voltar</Link>
        : receitaDetalhes.drinks
          .map((receita) => (
            <div key={ receita.idDrink }>
              <img
                data-testid="recipe-photo"
                style={ { width: '150px' } }
                src={ receita.strDrinkThumb }
                alt={ receita.strDrink }
              />
              <h4 data-testid="recipe-title">{ receita.strDrink }</h4>
              <Compartilhar idReceita={ locationId } />
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
              <h6 data-testid="recipe-category">{ receita.strAlcoholic}</h6>
              <h6 data-testid="recipe-category">{ receita.strCategory}</h6>

              <Ingredientes receitaDetalhes={ receitaDetalhes } />

              <p data-testid="instructions">{ receita.strInstructions }</p>
              <ComidaRecomendada recomenda="recomendaComida" />
              <BtnIniciarReceita receita={ receita } />

            </div>
          )) }
    </div>
  );
}
