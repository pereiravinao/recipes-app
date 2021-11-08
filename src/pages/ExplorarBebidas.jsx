import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExplorarBebidas() {
  return (
    <div>
      <Header title="Explorar Bebidas" />
      <div>
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
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
