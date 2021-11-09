import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { apiReceitaID } from '../services/RequestApi';
import Ingredientes from './Bebidas/Ingredientes';
import BtnIniciarReceita from './Bebidas/BtnIniciarReceita';

import shareIcon from '../images/shareIcon.svg';
import ComidaRecomendada from './ComidaRecomendada';

export default function DetalhesBebidas() {
  const [receitaDetalhes, setReceitaDetalhes] = useState();
  const location = useLocation().pathname.replace('/bebidas/', '');

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    apiReceitaID(location, '/bebidas').then((res) => setReceitaDetalhes(res));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function saveFavoriteToLocalStorage(recipe) {
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

  function handleClick(id) {
    navigator.clipboard.writeText(`http://localhost:3000/bebidas/${id}`);
    setCopied(true);
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
              <button
                type="button"
                data-testid="share-btn"
                onClick={ () => { handleClick(receita.idDrink); } }
              >
                <img src={ shareIcon } alt="Compartilhar" />
              </button>
              <button
                type="button"
                data-testid="favorite-btn"
                onClick={ () => saveFavoriteToLocalStorage(receita) }
              >
                Favoritar
              </button>
              { copied ? 'Link copiado!' : ''}
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
