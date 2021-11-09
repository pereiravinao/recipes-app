import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { apiAleatoria } from '../services/RequestApi';

export default function ExplorarComidas({ history }) {
  const handleClick = () => {
    apiAleatoria('comida')
      .then((result) => {
        history.push(`/comidas/${result.meals[0].idMeal}`);
      });
  };

  return (
    <div>
      <Header title="Explorar Comidas" />
      <div>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => {
            history.push('/explorar/comidas/ingredientes');
          } }
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-by-area"
          onClick={ () => {
            history.push('/explorar/comidas/area');
          } }
        >
          Por Local de Origem
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ handleClick }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

ExplorarComidas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
