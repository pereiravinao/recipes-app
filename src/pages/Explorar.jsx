import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explorar({ history }) {
  const redirectClick = (type) => (
    type === 'food'
      ? history.push('/explorar/comidas')
      : history.push('/explorar/bebidas')
  );

  return (
    <div>
      <Header title="Explorar" />
      <div>
        <button
          type="button"
          data-testid="explore-food"
          onClick={ () => redirectClick('food') }
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => redirectClick('drink') }
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </div>
  );
}

Explorar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
