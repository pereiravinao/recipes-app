import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExplorarComidas() {
  return (
    <div>
      <Header title="Explorar Comidas" />
      <div>
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}
