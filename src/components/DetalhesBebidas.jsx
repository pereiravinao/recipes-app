import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { apiReceitaID } from '../services/RequestApi';

import shareIcon from '../images/shareIcon.svg';
import ComidaRecomendada from './ComidaRecomendada';

export default function DetalhesBebidas() {
  const [receitaDetalhes, setReceitaDetalhes] = useState();
  const location = useLocation().pathname.replace('/bebidas/', '');

  const [copied, setCopied] = useState(false);
  const quantidades = !receitaDetalhes ? [] : Object.entries(receitaDetalhes.drinks[0])
    .filter((e) => e[0].includes('strMeasure'))
    .filter((i) => i[1] !== null).map((ing) => ing[1]);

  const ingredients = !receitaDetalhes ? [] : Object.entries(receitaDetalhes.drinks[0])
    .filter((e) => e[0].includes('strIngredient'))
    .filter((i) => i[1] !== null).map((ing) => ing[1]);

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

  useEffect(() => {
    apiReceitaID(location, '/bebidas').then((res) => setReceitaDetalhes(res));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      { !receitaDetalhes
        ? <Link to="/comidas">Voltar</Link>
        : receitaDetalhes.drinks
          .map((receita, idx) => (
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
              <ul data-testid={ `${idx}-ingredient-name-and-measure` }>
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
              <p data-testid="instructions">{ receita.strInstructions }</p>
              <ComidaRecomendada recomenda="recomendaComida" />
              <Link to={ `/bebidas/${receita.idDrink}/in-progress` }>
                <button
                  type="button"
                  data-testid="start-recipe-btn"
                  style={ { position: 'fixed', bottom: '0px' } }
                >
                  Iniciar Receita

                </button>
              </Link>
            </div>
          )) }
    </div>
  );
}
