import PropTypes from 'prop-types';
import React, { useState } from 'react';
import CardIngrediente from '../components/CardIngrediente';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { apiListaIngredientes } from '../services/RequestApi';

export default function ExplorarIngredientes({ history }) {
  const DOZE = 12;

  const [listaIngredientes, setListaIngredientes] = useState([]);

  if (history.location.pathname === '/explorar/bebidas/ingredientes') {
    apiListaIngredientes('bebida')
      .then((results) => {
        setListaIngredientes(results.drinks);
      });
  }
  if (history.location.pathname === '/explorar/comidas/ingredientes') {
    apiListaIngredientes('comida')
      .then((results) => {
        setListaIngredientes(results.meals);
      });
  }

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <div>
        { listaIngredientes
          ? listaIngredientes
            .filter((_e, i) => i < DOZE)
            .map((ingrediente, idx) => (
              <CardIngrediente key={ idx } idx={ idx } ingrediente={ ingrediente } />
            ))
          : 'Carregando...'}
      </div>
      <Footer />
    </div>
  );
}

ExplorarIngredientes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};
