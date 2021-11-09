import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { apiAleatoria } from '../services/RequestApi';

export default function ExplorarBebidas({ history }) {
  const handleClick = () => {
    apiAleatoria('bebida')
      .then((result) => {
        history.push(`/bebidas/${result.drinks[0].idDrink}`);
      });
  };

  return (
    <div>
      <Header title="Explorar Bebidas" />
      <div>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => {
            history.push('/explorar/bebidas/ingredientes');
          } }
        >
          Por Ingredientes
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

ExplorarBebidas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
